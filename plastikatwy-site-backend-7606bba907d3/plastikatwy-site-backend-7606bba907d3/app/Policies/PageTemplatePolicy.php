<?php

namespace App\Policies;

use App\Models\Page;
use App\Models\PageTemplate;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PageTemplatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Page $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, PageTemplate $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, PageTemplate $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, PageTemplate $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, PageTemplate $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    public function audit(User $user, PageTemplate $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }

    public function restoreAudit(User $user, PageTemplate $page): bool
    {
        return $user->hasRole('Desenvolvedor');
    }
}
