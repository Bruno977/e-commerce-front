"use client";

import type React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "../../components/ImageUpload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../lib/actions/create-category";
import { CategoryFormSchema } from "../lib/definitions";
import { ErrorInputForm, ErrorMessage } from "@/components/ui/error-message";
import { getCategory } from "../lib/actions/get-category";

import { useEffect } from "react";
import { CategoryProps } from "@/types/category";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { updateCategory } from "../lib/actions/update-category";
import { useRouter } from "next/navigation";

export type CategoryFormData = z.infer<typeof CategoryFormSchema>;

interface CategoryFormProps {
  categoryId?: string;
}

export default function CategoryForm({ categoryId }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(categoryId);
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      isActive: true,
      image: undefined,
    },
  });

  const { data, isLoading, error, refetch } = useQuery<CategoryProps>({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory({ categoryId }),
    enabled: isEditing,
  });

  const categoryMutation = useMutation({
    mutationFn: isEditing ? updateCategory : createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      const messageToast = isEditing
        ? "Categoria atualizada com sucesso!"
        : "Categoria criada com sucesso!";

      toast.success(messageToast);
      if (isEditing) {
        router.push("/admin/categorias");
        return;
      }
      reset();
    },
    onError: (error: any) => {
      const messageToast = isEditing
        ? "Erro ao atualizar categoria: "
        : "Erro ao criar categoria: ";
      toast.error(`${messageToast} ${error?.message}`);
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const payload = {
      categoryId,
      ...data,
    };
    categoryMutation.mutate(payload);
  };
  const handleRetry = () => {
    refetch();
  };
  const labelButton = categoryMutation.isPending
    ? "Salvando..."
    : isEditing
    ? "Atualizar Categoria"
    : "Criar Categoria";

  useEffect(() => {
    if (data && isEditing) {
      reset({
        title: data.title,
        description: data.description,
        isActive: data.is_active,
      });
    }
  }, [data, isEditing, reset]);

  if (isEditing && isLoading) {
    return <ProductCardSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={handleRetry} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Nome da Categoria</Label>
                <Input
                  {...register("title")}
                  disabled={isEditing && isLoading}
                  placeholder="Ex: Eletrônicos"
                />
                {errors.title?.message && (
                  <ErrorInputForm message={errors.title?.message} />
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  {...register("description")}
                  disabled={isEditing && isLoading}
                  placeholder="Descreva a categoria..."
                  rows={4}
                />
                {errors.description?.message && (
                  <ErrorInputForm message={errors.description?.message} />
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Título SEO</Label>
                <Input
                  {...register("metaTitle")}
                  disabled={isEditing && isLoading}
                  placeholder="Título para mecanismos de busca"
                />
                {errors.metaTitle?.message && (
                  <ErrorInputForm message={errors.metaTitle?.message} />
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Recomendado: 50-60 caracteres
                </p>
              </div>

              <div>
                <Label htmlFor="metaDescription">Descrição SEO</Label>
                <Textarea
                  {...register("metaDescription")}
                  disabled={isEditing && isLoading}
                  placeholder="Descrição para mecanismos de busca"
                  rows={3}
                />
                {errors.metaDescription?.message && (
                  <ErrorInputForm message={errors.metaDescription?.message} />
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Recomendado: 150-160 caracteres
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      disabled={isEditing && isLoading}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="isActive">Categoria ativa</Label>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Categorias inativas não aparecem na loja
              </p>
            </CardContent>
          </Card>

          {/* Imagem */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem da Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={(file) => field.onChange(file)}
                    onRemove={() => field.onChange(undefined)}
                    disabled={isEditing && isLoading}
                  />
                )}
              />
              {errors.image?.message && (
                <ErrorInputForm message={errors.image?.message} />
              )}
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={
                    categoryMutation.isPending || (isEditing && isLoading)
                  }
                >
                  {labelButton}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={
                    categoryMutation.isPending || (isEditing && isLoading)
                  }
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
