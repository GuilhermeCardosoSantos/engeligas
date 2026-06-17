"use client";

import * as React from "react";

import {
  ImageIcon,
  Trash2,
  UploadCloud,
  ExternalLink,
} from "lucide-react";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import Button from "@/components/ui/button/Button";

import { useGetOrderImages } from "@/hooks/order/useGetOrderImages";
import { useUploadOrderImages } from "@/hooks/order/useUploadOrderImages";
import { useDeleteOrderImage } from "@/hooks/order/useDeleteOrderImage";

type Props = {
  pedidoId: number;
};

type OrderImage = {
  filename: string;
  url: string;
};

const getApiUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_API_URL ?? "";

  return url.endsWith("/")
    ? url
    : `${url}/`;
};

export default function OrderImagesCard({
  pedidoId,
}: Props) {
  const inputRef =
    React.useRef<HTMLInputElement | null>(
      null
    );

  const queryClient =
    useQueryClient();

  const {
    data: images = [],
    isLoading,
  } = useGetOrderImages(pedidoId);

  const uploadImages =
    useUploadOrderImages();

  const deleteImage =
    useDeleteOrderImage();

  const handleSelectFiles = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files ?? []
    );

    if (files.length === 0) {
      return;
    }

    try {
      await uploadImages.mutateAsync({
        pedidoId,
        files,
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "order-images",
          pedidoId,
        ],
      });

      toast.success(
        "Imagem enviada com sucesso."
      );

      event.target.value = "";
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao enviar imagem."
      );
    }
  };

  const handleDelete = async (
    filename: string
  ) => {
    const confirmed = window.confirm(
      "Deseja remover esta imagem?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteImage.mutateAsync({
        pedidoId,
        filename,
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "order-images",
          pedidoId,
        ],
      });

      toast.success(
        "Imagem removida com sucesso."
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao remover imagem."
      );
    }
  };

  const buildImageUrl = (
    image: OrderImage
  ) => {
    return `${getApiUrl()}${image.url}`;
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
            <ImageIcon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Imagens do Pedido
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload e visualização de imagens vinculadas ao pedido.
            </p>
          </div>
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleSelectFiles}
            className="hidden"
          />

          <Button
            onClick={() =>
              inputRef.current?.click()
            }
            disabled={uploadImages.isPending}
          >
            <UploadCloud className="h-4 w-4" />
            {uploadImages.isPending
              ? "Enviando..."
              : "Enviar Imagens"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
          Carregando imagens...
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
            <ImageIcon className="h-5 w-5" />
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nenhuma imagem cadastrada.
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Envie imagens relacionadas a este pedido.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {images.map((image: OrderImage) => (
            <div
              key={image.filename}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <a
                href={buildImageUrl(image)}
                target="_blank"
                rel="noreferrer"
                className="block aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900"
              >
                <img
                  src={buildImageUrl(image)}
                  alt={image.filename}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </a>

              <div className="flex items-center justify-between gap-3 p-3">
                <p className="truncate text-xs font-medium text-gray-600 dark:text-gray-300">
                  {image.filename}
                </p>

                <div className="flex shrink-0 gap-2">
                  <a
                    href={buildImageUrl(image)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-engeligas-500 hover:text-engeligas-500 dark:border-gray-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    disabled={
                      deleteImage.isPending
                    }
                    onClick={() =>
                      handleDelete(
                        image.filename
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}