"use client";

import type React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "../../components/ImageUpload";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../lib/actions/create-category";
import { CategoryFormSchema } from "../lib/definitions";
import { ErrorInputForm } from "@/components/ui/error-message";

export type CategoryFormData = z.infer<typeof CategoryFormSchema>; // Inferindo o tipo do esquema

export default function CategoryForm() {
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
  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    categoryMutation.mutate(data);
  };

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
                <Input {...register("title")} placeholder="Ex: Eletrônicos" />
                {errors.title?.message && (
                  <ErrorInputForm message={errors.title?.message} />
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  {...register("description")}
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
                  disabled={categoryMutation.isPending}
                >
                  {categoryMutation.isPending
                    ? "Salvando..."
                    : "Criar Categoria"}
                  {/* {isLoading
                    ? "Salvando..."
                    : categoryId
                    ? "Atualizar Categoria"
                    : "Criar Categoria"} */}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={categoryMutation.isPending}
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
