"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { EditorialImage, ProjectFilm } from "@/types/content";

type ProjectGalleryProps = {
  images: readonly EditorialImage[];
  title: string;
  film?: ProjectFilm;
};

export function ProjectGallery({ images, title, film }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function openAt(index: number) {
    setActiveIndex(index);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function step(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!dialog.open) return;
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }
    };

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [images.length]);

  const filmBreak = film ? Math.min(6, images.length) : images.length;
  const openingImages = images.slice(0, filmBreak);
  const closingImages = images.slice(filmBreak);

  return (
    <section className="photo-essay" aria-label={`${title} image gallery`}>
      <GallerySequence images={openingImages} startIndex={0} onOpen={openAt} />

      {film ? <FilmBlock film={film} /> : null}

      <GallerySequence
        images={closingImages}
        startIndex={filmBreak}
        onOpen={openAt}
      />

      <dialog ref={dialogRef} className="lightbox" aria-label={`${title} enlarged image viewer`}>
        {activeImage ? (
          <div className="lightbox-inner">
            <div className="lightbox-top">
              <span>{title}</span>
              <button type="button" onClick={close}>Close</button>
            </div>
            <div className="lightbox-media">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                priority
              />
            </div>
            <div className="lightbox-bottom">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image">← Previous</button>
              <span>{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => step(1)} aria-label="Next image">Next →</button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

function GallerySequence({
  images,
  startIndex,
  onOpen,
}: {
  images: readonly EditorialImage[];
  startIndex: number;
  onOpen: (index: number) => void;
}) {
  const blocks: React.ReactNode[] = [];

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const next = images[index + 1];
    const isPair =
      image.layout === "pair-left" && next?.layout === "pair-right";

    if (isPair) {
      blocks.push(
        <div className="essay-pair" key={`${image.src}-${next.src}`}>
          <GalleryFigure image={image} onOpen={() => onOpen(startIndex + index)} />
          <GalleryFigure image={next} onOpen={() => onOpen(startIndex + index + 1)} />
        </div>,
      );
      index += 1;
      continue;
    }

    const frameClass =
      image.layout === "full-bleed"
        ? "full"
        : image.layout === "wide"
          ? "wide"
          : image.layout === "inset-left"
            ? "inset-left"
            : image.layout === "inset-right"
              ? "inset-right"
              : image.aspect === "portrait"
                ? "portrait"
                : "constrained";

    blocks.push(
      <div className={`essay-frame ${frameClass}`} key={image.src}>
        <GalleryFigure image={image} onOpen={() => onOpen(startIndex + index)} />
      </div>,
    );
  }

  return blocks;
}

function FilmBlock({ film }: { film: ProjectFilm }) {
  return (
    <section className="project-film" id="film" aria-labelledby="project-film-title">
      <div className="project-film-heading">
        <h2 id="project-film-title">Project film</h2>
        <span>{film.duration}</span>
      </div>
      <video
        controls
        playsInline
        preload="none"
        poster={film.poster.src}
        width={film.width}
        height={film.height}
        aria-label={film.title}
      >
        <source src={film.src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      <p>{film.caption}</p>
    </section>
  );
}

function GalleryFigure({ image, onOpen }: { image: EditorialImage; onOpen: () => void }) {
  return (
    <figure>
      <button type="button" onClick={onOpen} aria-label={`Enlarge image: ${image.alt}`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={image.aspect === "portrait" ? "(max-width: 640px) 100vw, 50vw" : "100vw"}
        />
      </button>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}
