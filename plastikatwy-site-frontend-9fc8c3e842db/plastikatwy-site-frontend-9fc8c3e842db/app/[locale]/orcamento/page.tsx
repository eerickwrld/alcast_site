"use client"
import Image from "next/image";
import Header from "@/components/header";
import {products} from "@/components/product-grid-showcase";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NumberInput,
  Divider,
  Select,
  SelectItem,
  Checkbox
} from "@heroui/react";
import {
  useForm,
  Controller,
  UseFormResetField,
  UseFormWatch,
  Control,
  UseFormSetValue
} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState, useEffect, useMemo, useCallback} from "react";
import HeroSlider from "@/components/hero-slider";
import {useTranslations} from "next-intl";
import {PageResponse, Segment} from "@/services/types";
import {getPageBySlug, submitQuote, getSegments} from "@/services/api";
import Footer from "@/components/footer";
import {getContentByLanguage} from "@/helpers/getContentByLanguage";
import {useLanguage} from "@/contexts/language-context";
import {localePagePathname} from "@/helpers/localePagePathname";

// Definição da interface de dados do formulário
interface FormData {
  produto: string;
  largura: string | null;
  comprimento: string | null;
  diametro: string | null;
  diametroExterno: string | null;
  espessura: string | null;
  liga: string | null;
  tempera: string | null;
  quantity: number | null;
  larguraTotal: string | null;
  passoDaOnda: string | null;
  espacoUtilRecobrimentoSimples: string | null;
  espacoUtilRecobrimentoDuplo: string | null;
  tipoMedida: "peso" | "quantidade" | null;
  primeiroNome: string;
  sobreNome: string;
  email: string;
  empresa: string;
  telefone: string;
  segmento: string;
  uf: string;
  pais: string;
  lgpdConsent: boolean;
}

// Tipo para permitir acesso dinâmico às propriedades de FormData
type FormDataKey = keyof FormData;

// Props para componentes relacionados a produtos
interface ProductSectionProps {
  control: Control<FormData>;
  resetField: UseFormResetField<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch?: UseFormWatch<FormData>;
}

// Interface para orçamento salvo
interface SavedOrcamento {
  id: string;
  date: string;
  produto: string;
  properties: Record<string, any>;
  quantity: number | null;
}

// Interface para dados do usuário
interface UserData {
  primeiroNome: string;
  sobreNome: string;
  email: string;
  empresa: string;
  telefone: string;
  segmento: string;
  uf: string;
  pais: string;
  lgpdConsent: boolean;
}

// Interface para orçamento completo
interface CompleteOrcamento extends SavedOrcamento {
  userData?: UserData;
}

// Schema base para os campos não relacionados às propriedades do produto
const baseSchema = {
  produto: Yup.string().required("Produto é obrigatório"),
  quantity: Yup.number().min(1, "Quantidade mínima é 1"),
};

// Função para converter valor de string para número
const parseNumber = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const parsed = parseFloat(value.replace(',', '.'));
  return isNaN(parsed) ? null : parsed;
};

// Função para criar um schema dinâmico com base nas propriedades do produto
const createDynamicSchema = (selectedProduct: typeof products[0] | undefined) => {
  // Criar uma cópia do schema base como Record para permitir indexação dinâmica
  const schema: Record<string, any> = {...baseSchema};

  if (!selectedProduct || !selectedProduct.properties) {
    return Yup.object().shape(schema);
  }

  const properties = selectedProduct.properties;

  // Para cada propriedade no produto, adicione validação correspondente
  Object.entries(properties).forEach(([key, value]) => {
    // Pular objetos aninhados que não são para validação
    if (typeof value === "object" && !Array.isArray(value) && !("min" in value) && !("value" in value)) {
      return;
    }

    // Mapear a chave para o nome do campo no formulário
    let fieldName = key;
    if (key === 'ligas') fieldName = 'liga';
    if (key === 'temperas') fieldName = 'tempera';

    // Criar validação baseada no tipo de valor
    if (Array.isArray(value)) {
      // Para campos de seleção (arrays)
      schema[fieldName] = Yup.string()
        .nullable()
        // .test(
        //   'is-valid-option',
        //   `Deve ser um dos seguintes valores: ${value.join(', ')}`,
        //   (val) => !val || value.includes(val)
        // )
        .required('Campo obrigatório')
    } else if (typeof value === 'object' && 'min' in value) {
      // Para campos com limites min/max
      const min = value.min;
      const max = value.max;
      const unit = value.unit || '';

      schema[fieldName] = Yup.string()
        .nullable()
        .test('is-number', 'Deve ser um número válido', (val) => {
          if (!val) return true;
          const num = parseNumber(val);
          return num !== null;
        })
        // .test('min-value', `Valor mínimo é ${min}${unit}`, (val) => {
        //   if (!val) return true;
        //   const num = parseNumber(val);
        //   return num !== null && num >= min;
        // })
        // .test('max-value', `Valor máximo é ${max}${unit}`, (val) => {
        //   if (!val) return true;
        //   const num = parseNumber(val);
        //   return num !== null && num <= max;
        // })
        .required('Campo obrigatório')
    } else if (typeof value === 'object' && 'value' in value) {
      // Para valores fixos
      schema[fieldName] = Yup.string().nullable().required('Campo obrigatório')
    }
  });

  return Yup.object().shape(schema);
};

// Função para formatar telefone baseado no locale
const formatPhoneNumber = (value: string, locale: string): string => {
  if (!value) return value;

  // Remove todos os caracteres não numéricos
  const phoneNumber = value.replace(/\D/g, '');

  // Aplicar máscara baseada no locale
  switch (locale.toLowerCase()) {
    case 'pt-br':
      // Formato brasileiro: (00) 00000-0000
      if (phoneNumber.length <= 2) {
        return phoneNumber;
      } else if (phoneNumber.length <= 6) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
      } else if (phoneNumber.length <= 10) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
      } else {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
      }

    case 'es':
      // Formato espanhol: +34 000 00 00 00
      if (phoneNumber.length <= 2) {
        return `+${phoneNumber}`;
      } else if (phoneNumber.length <= 5) {
        return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
      } else if (phoneNumber.length <= 7) {
        return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5)}`;
      } else if (phoneNumber.length <= 9) {
        return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 7)} ${phoneNumber.slice(7)}`;
      } else {
        return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 7)} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9, 11)}`;
      }

    default: // 'en' e outros
      // Formato internacional: +1 (000) 000-0000
      if (phoneNumber.length <= 1) {
        return `+${phoneNumber}`;
      } else if (phoneNumber.length <= 4) {
        return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1)}`;
      } else if (phoneNumber.length <= 7) {
        return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
      } else {
        return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`;
      }
  }
};

// Helper function to validate min/max values
const validateMinMax = (value: string | null, min: number, max: number, unit: string): boolean | string => {
  if (!value) return true;

  const numValue = parseFloat(value.replace(',', '.'));

  if (isNaN(numValue)) {
    return `Valor inválido`;
  }

  if (numValue < min) {
    return `Valor mínimo é ${min}${unit}`;
  }

  if (numValue > max) {
    return `Valor máximo é ${max}${unit}`;
  }

  return true;
};

// Helper to determine label text
const getParamLabel = (key: string, value: any, t: any): string => {
  // Usar o nome humanizado se disponível, ou o próprio key com primeira letra maiúscula
  const baseLabel = getHumanizedLabels(key, t)

  if (Array.isArray(value)) {
    return baseLabel;
  }

  // else if (typeof value === "object" && value.min !== undefined) {
  //   return `${baseLabel} (${value.min} - ${value.max} ${value.unit || ""})`;
  // } else if (typeof value === "object" && value.value !== undefined) {
  //   return `${baseLabel}: ${value.value} ${value.unit || ""}`;
  // }

  return baseLabel;
};

// Mapeia as chaves das propriedades para os nomes dos campos no formulário
const mapKeyToFormField = (key: string): FormDataKey | null => {
  const mapping: Record<string, FormDataKey> = {
    'ligas': 'liga',
    'temperas': 'tempera'
  };

  return mapping[key] || key as FormDataKey;
};

const ProductParametersSection = ({t, control, watch, setValue}: ProductSectionProps) => {
  const formProduct = watch ? watch("produto") : "";
  const selectedProduct = products.find(p => p.slug === formProduct);
  const params = selectedProduct?.properties || {};

  // Helper para validar campo com base nas regras min/max
  const validateField = (fieldName: string, value: string | null): string | true => {
    if (!selectedProduct || !value) return true;

    // Ajuste para evitar erros de tipagem com acesso de índice
    const propKey = fieldName
      .replace('diametroExterno', 'diametroExterno')
      .replace('liga', 'ligas')
      .replace('tempera', 'temperas');

    // Garantir que o key existe nos parâmetros
    if (!(propKey in params)) return true;

    const prop = params[propKey as keyof typeof params];

    if (!prop) return true;

    // Se for um array, verifica se o valor está na lista
    if (Array.isArray(prop)) {
      const options = prop as string[];
      return options.includes(value) ? true : `Valor deve ser um dos seguintes: ${options.join(', ')}`;
    }

    // Se for um objeto com min/max, valida os limites
    if (typeof prop === 'object' && prop !== null && 'min' in prop) {
      const propWithMinMax = prop as { min: number; max: number; unit?: string };
      const result = validateMinMax(value, propWithMinMax.min, propWithMinMax.max, propWithMinMax.unit || '');

      // Removido regra de mínimo e máximo (cliente pediu)
      // Garantir que o tipo seja string | true
      return true // result === true ? true : String(result);
    }

    return true;
  };

  // Renderiza campo de entrada com validação
  const renderInputField = (key: string, fieldName: FormDataKey, value: any) => {
    const label = getParamLabel(key, value, t);

    // Para inputs numéricos com min/max
    if (typeof value === 'object' && 'min' in value) {
      return (
        <Controller
          key={key}
          name={fieldName}
          control={control}
          rules={{
            validate: (fieldValue) => {
              // Garantir que o valor é string para validação
              return validateField(key, fieldValue ? String(fieldValue) : null);
            }
          }}
          render={({field, fieldState}) => {
            const fieldValue = field.value === null ? "" : String(field.value);
            return (
              <div>
                <Input
                  type="text"
                  label={label}
                  placeholder={value.min ? `Ex: ${value.min}${value.unit}` : ""}
                  labelPlacement="outside"
                  value={fieldValue}
                  onChange={(e) => {
                    // Permite apenas números, vírgula e ponto
                    const newValue = e.target.value.replace(/[^0-9.,]/g, '');
                    field.onChange(newValue);
                  }}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              </div>
            );
          }}
        />
      );
    }

    // Para selects (arrays)
    if (Array.isArray(value)) {
      // Caso especial para tipoMedida - usar radio buttons
      if (key === 'tipoMedida') {
        return (
          <Controller
            key={key}
            name={fieldName}
            control={control}
            rules={{
              validate: (fieldValue) => {
                return validateField(key, fieldValue ? String(fieldValue) : null);
              }
            }}
            render={({field, fieldState}) => {
              return (
                <div>
                  <p className="mb-2 text-sm font-medium">{label}:</p>
                  <div className="flex gap-4">
                    <div className="flex gap-4">
                      <label className="flex gap-2 items-center">
                        <input
                          type="radio"
                          value="peso"
                          checked={field.value === "peso"}
                          onChange={() => field.onChange("peso")}
                          className="text-primary"
                        />
                        <span>{t("fields.weight")}</span>
                      </label>
                      <label className="flex gap-2 items-center">
                        <input
                          type="radio"
                          value="quantidade"
                          checked={field.value === "quantidade"}
                          onChange={() => field.onChange("quantidade")}
                          className="text-primary"
                        />
                        <span>{t("fields.quantity")}</span>
                      </label>
                    </div>
                  </div>
                  {fieldState.error && (
                    <p className="mt-1 text-xs text-danger">{fieldState.error.message}</p>
                  )}
                </div>
              );
            }}
          />
        );
      }

      // Para outros arrays, usar Select
      // return (
      //   <Controller
      //     key={key}
      //     name={fieldName}
      //     control={control}
      //     rules={{
      //       validate: (fieldValue) => {
      //         // Garantir que o valor é string para validação
      //         return validateField(key, fieldValue ? String(fieldValue) : null);
      //       }
      //     }}
      //     render={({ field, fieldState }) => {
      //       const fieldValue = field.value ? String(field.value) : "";
      //       return (
      //         <div>
      //           <Select
      //             label={label}
      //             placeholder="Selecione uma opção"
      //             labelPlacement="outside"
      //             onChange={(e) => field.onChange(e.target.value)}
      //             selectedKeys={fieldValue ? [fieldValue] : []}
      //             classNames={{
      //               listbox: "bg-background text-foreground",
      //               popoverContent: "bg-background",
      //               base: "text-foreground"
      //             }}
      //             isInvalid={!!fieldState.error}
      //             errorMessage={fieldState.error?.message}
      //           >
      //             {value.map((option: string) => (
      //               <SelectItem key={option} className="text-foreground hover:bg-gray-100">
      //                 {option}
      //               </SelectItem>
      //             ))}
      //           </Select>
      //         </div>
      //       );
      //     }}
      //   />
      // );
    }

    // Para outros tipos de valor
    return (
      <Controller
        key={key}
        name={fieldName}
        control={control}
        render={({field, fieldState}) => {
          const fieldValue = field.value === null ? "" : String(field.value);
          return (
            <div>
              <Input
                type="text"
                label={label}
                placeholder={`${typeof value === 'object' && 'value' in value ? `Ex.: ${value.value}${value.unit}` : t("fields.placeholder")}`}
                labelPlacement="outside"
                value={fieldValue}
                onChange={(e) => field.onChange(e.target.value)}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            </div>
          );
        }}
      />
    );
  };

  if (!selectedProduct) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-bold text-primary">{t("parameters.title")}</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="text-gray-500">
            {t("parameters.empty")}
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-bold text-primary">{t("parameters.title")}</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {Object.entries(params || {}).map(([key, value]: [string, any]) => {
          // Skip nested objects like 'naoPlanificada'
          if (typeof value === "object" && !Array.isArray(value) && !("min" in value) && !("value" in value)) return null

          const fieldName = mapKeyToFormField(key);

          if (!fieldName) return null;

          return renderInputField(key, fieldName, value);
        })}
      </CardBody>
    </Card>
  )
}

const ufOptions = [
  {"nome": "Acre", "sigla": "AC"},
  {"nome": "Alagoas", "sigla": "AL"},
  {"nome": "Amapá", "sigla": "AP"},
  {"nome": "Amazonas", "sigla": "AM"},
  {"nome": "Bahia", "sigla": "BA"},
  {"nome": "Ceará", "sigla": "CE"},
  {"nome": "Distrito Federal", "sigla": "DF"},
  {"nome": "Espírito Santo", "sigla": "ES"},
  {"nome": "Goiás", "sigla": "GO"},
  {"nome": "Maranhão", "sigla": "MA"},
  {"nome": "Mato Grosso", "sigla": "MT"},
  {"nome": "Mato Grosso do Sul", "sigla": "MS"},
  {"nome": "Minas Gerais", "sigla": "MG"},
  {"nome": "Pará", "sigla": "PA"},
  {"nome": "Paraíba", "sigla": "PB"},
  {"nome": "Paraná", "sigla": "PR"},
  {"nome": "Pernambuco", "sigla": "PE"},
  {"nome": "Piauí", "sigla": "PI"},
  {"nome": "Rio de Janeiro", "sigla": "RJ"},
  {"nome": "Rio Grande do Norte", "sigla": "RN"},
  {"nome": "Rio Grande do Sul", "sigla": "RS"},
  {"nome": "Rondônia", "sigla": "RO"},
  {"nome": "Roraima", "sigla": "RR"},
  {"nome": "Santa Catarina", "sigla": "SC"},
  {"nome": "São Paulo", "sigla": "SP"},
  {"nome": "Sergipe", "sigla": "SE"},
  {"nome": "Tocantins", "sigla": "TO"}

]

// Componente para dados do usuário
const UserDataInformationSection = ({locale, control, t, tc}: { control: Control<UserData>, t: any, tc: any }) => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoadingSegments, setIsLoadingSegments] = useState(false);

  useEffect(() => {
    const fetchSegments = async () => {
      setIsLoadingSegments(true);
      try {
        const data = await getSegments({ quotation: true });
        if (data) {
          setSegments(data);
        }
      } catch (error) {
        console.error("Erro ao buscar segmentos:", error);
      } finally {
        setIsLoadingSegments(false);
      }
    };

    fetchSegments();
  }, []);

  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Coluna 1: Dados pessoais */}
      <div className="flex flex-col gap-4">
        <h4 className="font-medium text-gray-700 text-md">{t("resume.userInformations.personalData")}</h4>

        <div className="min-h-[80px]">
          <Controller
            name="primeiroNome"
            control={control}
            rules={{required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.primeiroNome")})}}
            render={({field, fieldState}) => (
              <Input
                {...field}
                type="text"
                id="primeiroNome"
                label={t("resume.userInformations.fields.primeiroNome")}
                placeholder="Ex: Marcos Eduardo"
                labelPlacement="outside"
                isRequired
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="min-h-[80px]">
          <Controller
            name="sobreNome"
            control={control}
            rules={{required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.sobreNome")})}}
            render={({field, fieldState}) => (
              <Input
                {...field}
                type="text"
                id="sobreNome"
                label={t("resume.userInformations.fields.sobreNome")}
                placeholder="Ex: Da Silva"
                labelPlacement="outside"
                isRequired
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="min-h-[80px]">
          <Controller
            name="email"
            control={control}
            rules={{
              required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.email")}),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email inválido"
              }
            }}
            render={({field, fieldState}) => (
              <Input
                {...field}
                type="email"
                id="email"
                label={t("resume.userInformations.fields.email")}
                placeholder="Ex: email@email.com"
                labelPlacement="outside"
                isRequired
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="min-h-[80px]">
          <Controller
            name="telefone"
            control={control}
            rules={{required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.uf")})}}
            render={({field, fieldState}) => (
              <Input
                value={field.value}
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value, language);
                  field.onChange(formattedValue);
                }}
                type="tel"
                id="telefone"
                label={t("resume.userInformations.fields.telefone")}
                placeholder={language === "pt-br" ? "Ex: (00) 00000-0000" :
                             language === "es" ? "Ex: +34 000 00 00 00" :
                             "Ex: +1 (000) 000-0000"}
                labelPlacement="outside"
                isRequired
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      {/* Coluna 2: Dados da empresa */}
      <div className="flex flex-col gap-4">
        <h4 className="font-medium text-gray-700 text-md">{t("resume.userInformations.companyData")}</h4>

        <div className="min-h-[80px]">
          <Controller
            name="empresa"
            control={control}
            rules={{required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.empresa")})}}
            render={({field, fieldState}) => (
              <Input
                {...field}
                type="text"
                id="empresa"
                label={t("resume.userInformations.fields.empresa")}
                placeholder="Ex: MARCOS E LUIZ LTDA"
                labelPlacement="outside"
                isRequired
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="min-h-[80px]">
          <Controller
            name="segmento"
            control={control}
            rules={{required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.segmento")})}}
            render={({field, fieldState}) => (
              <Select
                items={isLoadingSegments ? [] : segments.map(segment => ({
                  value: segment.slug,
                  label: getContentByLanguage(segment.name, locale)
                }))}
                {...field}
                id="segmento"
                label={t("resume.userInformations.fields.segmento")}
                placeholder={isLoadingSegments ? tc('loading') : t('resume.userInformations.fields.placeholder')}
                labelPlacement="outside"
                isRequired
                isLoading={isLoadingSegments}
                classNames={{
                  listbox: "bg-background text-foreground",
                  popoverContent: "bg-background",
                  base: "text-foreground"
                }}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              >
                {(item) => (
                  <SelectItem key={item.value} className="text-foreground hover:bg-gray-100">
                    {item.label}
                  </SelectItem>
                )}
              </Select>
            )}
          />
        </div>

        <div className="min-h-[80px]">
          <Controller
            name="uf"
            control={control}
            rules={{required: t("resume.userInformations.errors.mandatory", {name: t("resume.userInformations.fields.uf")})}}
            render={({field, fieldState}) => (
              <Select
                {...field}
                id="uf"
                items={ufOptions}
                label={t("resume.userInformations.fields.uf")}
                placeholder="Ex: São Paulo"
                labelPlacement="outside"
                selectedKeys={field.value ? [field.value] : []}
                onSelectionChange={(keys) => field.onChange(keys)}
                isRequired
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              >
                {(item) => (
                  <SelectItem key={item.sigla} className="text-foreground hover:bg-gray-100">
                    {item.nome}
                  </SelectItem>
                )}
              </Select>
            )}
          />
        </div>
      </div>

      <div className="min-h-[40px] col-span-2 mt-2">
        <Controller
          name="lgpdConsent"
          control={control}
          render={({field}) => (
            <Checkbox
              id="lgpdConsent"
              isSelected={field.value}
              onValueChange={field.onChange}
              color="primary"
            >
                <span className="text-sm text-gray-600">
                  {t("resume.userInformations.fields.lgpdConsent")}
                </span>
            </Checkbox>
          )}
        />
      </div>
    </div>
  )
}

// Mapeamento para nomes humanizados das propriedades
const getHumanizedLabels = (key: string, t): string => {
  const labels = {
    'largura': t("fields.width"),
    'comprimento': t("fields.length"),
    'diametro': t("fields.diameter"),
    'diametroExterno': t("fields.outerDiameter"),
    'espessura': t("fields.thickness"),
    'ligas': t("fields.alloys"),
    'liga': t("fields.alloy"),
    'temperas': t("fields.tempers"),
    'tempera': t("fields.temper"),
    'tipoMedida': t("fields.measureType"),
    'larguraTotal': t("fields.totalWidth"),
    'passoDaOnda': t("fields.waveStep"),
    'espacoUtilRecobrimentoSimples': t("fields.spaceUtilizationSimpleCoverage"),
    'espacoUtilRecobrimentoDuplo': t("fields.spaceUtilizationDoubleCoverage")
  }

  return labels[key] || key
};

// Componente para exibir resumo dos orçamentos
const OrcamentoSummary = ({t, orcamentos, onRemoveItem}: { orcamentos: SavedOrcamento[], onRemoveItem: (id: string) => void }) => {
  if (orcamentos.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p>{t("resume.actions.add.feedback.error")}</p>
        <Divider className="my-2"/>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">{t("resume.items.title")}</h3>
      {orcamentos.map((orcamento) => (
        <div
          key={orcamento.id}
          className="p-3 bg-white rounded-md border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-primary">{t(`products.${orcamento.produto}`)}</h4>
            <div className="flex gap-2 items-center">
              {/* <p className="text-sm text-gray-500">{orcamento.date}</p> */}
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onPress={() => onRemoveItem(orcamento.id)}
                aria-label="Remover item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
              </Button>
            </div>
          </div>
          <p className="mt-1 text-sm">
            {t("fields.quantity")}: {orcamento.quantity}
            {orcamento.properties.tipoMedida && (
              <span> ({orcamento.properties.tipoMedida === "peso" ? t("fields.quantityWeight") : t("fields.quantityUnits")})</span>
            )}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            {Object.entries(orcamento.properties)
              .filter(([_, value]) => value !== null && value !== "")
              .map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span>{getHumanizedLabels(key, t)}:</span>
                  <span className="first-letter:capitalize">{value}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
      <Divider className="my-2"/>
    </div>
  );
};

export default function PageContent({params}) {
  const [selectedProductName, setSelectedProductName] = useState<string>("");
  const [savedOrcamentos, setSavedOrcamentos] = useState<SavedOrcamento[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const t = useTranslations("budget")
  const tc = useTranslations("common")
  const [pageData, setPageData] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const {language} = useLanguage()

  useEffect(() => {
    const fetchPageData = async () => {
      const pageParams = await params
      setLoading(true);
      try {
        const data = await getPageBySlug(localePagePathname("/orcamento", pageParams.locale), pageParams.locale);
        setPageData(data);
      } catch (err: any) {
        console.error('Error fetching ESG page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  const selectedProduct = useMemo(() =>
      products.find(p => p.slug === selectedProductName),
    [selectedProductName]
  );

  // Criar schema dinâmico com base no produto selecionado
  const dynamicSchema = useMemo(() =>
      createDynamicSchema(selectedProduct),
    [selectedProduct]
  );

  // Formulário principal para o produto
  const form = useForm<FormData>({
    resolver: yupResolver(dynamicSchema) as any,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      produto: "",
      largura: "",
      comprimento: "",
      diametro: "",
      diametroExterno: "",
      espessura: "",
      liga: "",
      tempera: "",
      quantity: 0,
      larguraTotal: "",
      passoDaOnda: "",
      espacoUtilRecobrimentoSimples: "",
      espacoUtilRecobrimentoDuplo: "",
      tipoMedida: "peso",
      primeiroNome: "",
      sobreNome: "",
      email: "",
      empresa: "",
      telefone: "",
      segmento: "",
      uf: "",
      pais: "Brasil",
      lgpdConsent: false
    }
  });

  // Formulário para dados do usuário
  const userDataForm = useForm<UserData>({
    mode: "onBlur",
    defaultValues: {
      primeiroNome: "",
      sobreNome: "",
      email: "",
      empresa: "",
      telefone: "",
      segmento: "",
      uf: "",
      pais: "Brasil",
      lgpdConsent: false
    }
  });

  // Mostrar mensagem de sucesso
  const showSuccessMessage = useCallback((message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 5000);
  }, []);

  // Mostrar mensagem de erro
  const showErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000);
  }, []);

  // Carregar orçamentos salvos do localStorage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('orcamentos');
      if (savedItems) {
        setSavedOrcamentos(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
    }
  }, []);

  // Salvar orçamentos no localStorage quando a lista mudar
  useEffect(() => {
    if (savedOrcamentos.length > 0) {
      localStorage.setItem('orcamentos', JSON.stringify(savedOrcamentos));
    }
  }, [savedOrcamentos]);

  // Atualizar o produto selecionado quando o valor do formulário mudar
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.produto !== selectedProductName) {
        setSelectedProductName(value.produto || "");

        // Definir valor padrão para tipoMedida quando selecionar uma telha
        // const newProduct = products.find(p => p.name === value.produto);
        // if (newProduct?.properties?.tipoMedida && Array.isArray(newProduct.properties.tipoMedida)) {
        //   form.setValue("tipoMedida", "peso"); // Valor padrão
        // }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, selectedProductName]);

  // Função para resetar todas as propriedades do produto
  const resetAllProperties = useCallback(() => {
    const formFields: (keyof FormData)[] = [
      'largura', 'comprimento', 'diametro', 'diametroExterno',
      'espessura', 'liga', 'tempera', 'quantity', 'larguraTotal',
      'passoDaOnda', 'espacoUtilRecobrimentoSimples', 'espacoUtilRecobrimentoDuplo',
      'tipoMedida'
    ];

    formFields.forEach(field => form.resetField(field));
  }, [form]);

  // Função para lidar com o envio do formulário
  const onSubmit = (data: FormData) => {
    const selectedProduct = products.find(p => p.slug === data.produto);
    if (!selectedProduct) {
      showErrorMessage(t("resume.actions.add.feedback.error"));
      return;
    }

    // Coletar as propriedades preenchidas
    const properties: Record<string, any> = {};

    if (selectedProduct.properties) {
      Object.entries(selectedProduct.properties).forEach(([key, value]) => {
        // Mapear a chave para o nome do campo no formulário
        let fieldName = key;
        if (key === 'ligas') fieldName = 'liga';
        if (key === 'temperas') fieldName = 'tempera';

        // Verificar se há um valor para esta propriedade no formulário
        const formKey = fieldName as FormDataKey;
        if (data[formKey] !== null && data[formKey] !== undefined && data[formKey] !== '') {
          properties[key] = data[formKey];
        }
      });
    }

    // O tipo de medida já está sendo salvo como propriedade normal

    // Criar o objeto de orçamento
    const orcamento: SavedOrcamento = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      produto: data.produto,
      properties,
      quantity: data.quantity
    };

    // Adicionar o orçamento à lista
    setSavedOrcamentos(prev => [orcamento, ...prev]);

    // Salvar no localStorage
    try {
      const updatedOrcamentos = [orcamento, ...savedOrcamentos];
      localStorage.setItem('orcamentos', JSON.stringify(updatedOrcamentos));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }

    // Resetar o formulário
    resetAllProperties();
    form.setValue('produto', '');

    // Mostrar mensagem de sucesso
    showSuccessMessage(t("resume.actions.add.feedback.success"));
  };

  // Componente para definição da quantidade - memoizado
  const ProductQuantitySectionWithForm = useCallback(() => {
    // Função para lidar com o clique do botão
    const handleButtonClick = () => {
      form.handleSubmit(onSubmit)();
    };

    // Se não há produto selecionado, não renderiza o componente
    if (!selectedProductName) {
      return null;
    }

    return (
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-xl font-bold text-primary">{t('quantity.title')}</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {/* O campo de tipo de medida foi movido para os parâmetros do produto */}
          <Controller
            name="quantity"
            control={form.control}
            render={({field, fieldState}) => (
              <div>
                <NumberInput
                  disabled={field.disabled}
                  value={field.value === null ? undefined : field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  id="quantity"
                  placeholder="0"
                  label={`${t('fields.quantity')} (${form.watch("tipoMedida") === 'quantidade' ? 'un' : 'kg'})`}
                  labelPlacement="outside"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              </div>
            )}
          />
          <div className="mt-2">
            <Button
              color="primary"
              className="w-full"
              onPress={handleButtonClick}
              // isDisabled={!form.formState.isValid}
            >
              Adicionar ao orçamento
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }, [selectedProductName, form, onSubmit]);

  // Função para enviar o orçamento completo com dados do usuário
  const onSubmitCompleteOrcamento = useCallback(async (userData: UserData) => {
    // Verificar se há orçamentos para enviar
    if (savedOrcamentos.length === 0) {
      showErrorMessage(t("resume.actions.add.feedback.error"));
      return;
    }

    // Criar orçamento completo com dados do usuário
    const completeOrcamento = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      userData,
      items: savedOrcamentos
    };

    const response = await submitQuote(completeOrcamento)

    if (response.success) {
      setSavedOrcamentos([]);
      localStorage.removeItem('orcamentos');

      showSuccessMessage(t("resume.actions.submit.feedback.success"));
    } else {
      showErrorMessage(t("resume.actions.submit.feedback.error"));
    }

  }, [savedOrcamentos, showSuccessMessage, showErrorMessage]);

  // Função para remover um item específico do orçamento
  const handleRemoveItem = useCallback((id: string) => {
    // Confirmar com o usuário
    if (confirm(t("resume.actions.clear.confirmation"))) {
      // Remover o item do estado
      setSavedOrcamentos(prev => prev.filter(item => item.id !== id));

      // Atualizar o localStorage
      const updatedOrcamentos = savedOrcamentos.filter(item => item.id !== id);
      if (updatedOrcamentos.length > 0) {
        localStorage.setItem('orcamentos', JSON.stringify(updatedOrcamentos));
      } else {
        localStorage.removeItem('orcamentos');
      }

      // Mostrar mensagem
      showSuccessMessage(t("resume.actions.clear.feedback.success"));
    }
  }, [savedOrcamentos, showSuccessMessage]);

  // Componente para seleção de produto - memoizado
  const ProductSelectionSectionWithForm = useCallback(({t}) => {
    return (
      <Controller
        name="produto"
        control={form.control}
        render={({field: {onChange, value}}) => (
          <Card className="flex-1">
            <CardHeader>
              <h2 className="text-xl font-bold text-primary">{t("product_selection.title")}</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                  <Card
                    key={product.slug}
                    onPress={() => {
                      // Primeiro resetar as propriedades, depois atualizar o valor do produto
                      resetAllProperties();
                      onChange(product.slug);
                    }}
                    className={`flex ring-2 flex-col items-center justify-center transition-shadow hover:shadow-md ${value === product.slug ? "ring-primary" : "ring-gray-200"}`}
                    shadow="none"
                    isPressable
                    aria-label={`Selecionar produto ${product.slug}`}
                  >
                    <CardBody className="flex flex-col items-center p-0">
                      <div className="overflow-hidden relative w-[200px] h-[150px]">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.slug}
                          fill
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h3 className="px-4 py-2 text-base font-medium text-primary">{t(`products.${product.slug}`)}</h3>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
      />
    );
  }, [products]);

  // Componente para limpar todos os orçamentos - memoizado
  const ClearOrcamentosButton = useCallback(({t}) => {
    const handleClear = () => {
      if (confirm(t("resume.actions.clearAll.confirmation"))) {
        setSavedOrcamentos([]);
        localStorage.removeItem('orcamentos');
        showSuccessMessage(t("resume.actions.clearAll.feedback.success"));
      }
    };

    return (
      <Button
        color="danger"
        onPress={handleClear}
        isDisabled={savedOrcamentos.length === 0}
      >
        {t("resume.userInformations.clearButton")}
      </Button>
    );
  }, [savedOrcamentos.length, showSuccessMessage]);

  // Componente para enviar o orçamento - memoizado
  const SubmitOrcamentoButton = useCallback(({t}) => {
    return (
      <Button
        color="primary"
        onPress={() => userDataForm.handleSubmit(onSubmitCompleteOrcamento)()}
        isDisabled={savedOrcamentos.length === 0}
      >
        {t("resume.userInformations.submitButton")}
      </Button>
    );
  }, [savedOrcamentos.length, userDataForm, onSubmitCompleteOrcamento]);

  // Componente para exibir mensagens de feedback - memoizado
  const FeedbackMessage = useCallback(() => {
    if (successMessage) {
      return (
        <div className="relative px-4 py-3 mb-4 text-green-700 bg-green-100 rounded border border-green-400">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 rounded border border-red-400">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      );
    }

    return null;
  }, [successMessage, errorMessage]);

  return (
    <main className="flex flex-col min-h-screen bg-white text-foreground">
      <Header/>

      {/* Hero Section */}
      <HeroSlider
        slides={[
          {
            id: 1,
            title: pageData?.custom_fields_data?.["secao-hero"]?.title,
            description: pageData?.custom_fields_data?.["secao-hero"]?.description,
            subtitle: pageData?.custom_fields_data?.["secao-hero"]?.subtitle,
            image: pageData?.custom_fields_data?.["secao-hero"]?.image,
            bgPosition: "center center",
          }
        ]}
        curveColor="white"
        showCTA={false}
      />

      {/* Orçamento */}
      <div id="orcamento" className="relative z-10 mx-auto flex h-full max-w-[1557px] w-full flex-col items-start justify-start px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap gap-5 justify-start items-start mt-20 w-full md:flex-nowrap">
          <aside className="flex flex-col gap-4 justify-start items-start">
            <ProductSelectionSectionWithForm t={t}/>
            <ProductParametersSection
              t={t}
              control={form.control as any}
              resetField={form.resetField}
              setValue={form.setValue}
              watch={form.watch}
            />
            <ProductQuantitySectionWithForm/>
          </aside>
          <div className="flex-1">
            <Card className="w-full">
              <CardHeader>
                <h2 className="text-xl font-bold text-primary">{t("resume.title")}</h2>
              </CardHeader>
              <CardBody>
                {/* Componente de feedback de mensagens */}
                <FeedbackMessage/>

                <OrcamentoSummary
                  t={t}
                  orcamentos={savedOrcamentos}
                  onRemoveItem={handleRemoveItem}
                />

                {/* Adicionar os dados do usuário diretamente aqui */}
                {savedOrcamentos.length > 0 && (
                  <div className="mt-4">
                    <h3 className="mb-4 text-lg font-medium">{t("resume.userInformations.title")}</h3>
                    <UserDataInformationSection locale={language} t={t} tc={tc} control={userDataForm.control}/>
                  </div>
                )}

                <div className="flex gap-4 items-center self-end mt-4">
                  <ClearOrcamentosButton t={t}/>
                  <SubmitOrcamentoButton t={t}/>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Footer/>
    </main>
  );
}
