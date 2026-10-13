import type { ImageAsset } from "@/types/content";

/** Intrinsic dimensions for the initial optimized WebP image set. */
export const imageAssets = {
  lakeMinnetonkaHero: {
    src: "/images/lake-minnetonka-hero.webp",
    width: 2025,
    height: 777,
  },
  minneapolisBrickCourtyard: {
    src: "/images/minneapolis-brick-courtyard.webp",
    width: 1536,
    height: 1024,
  },
  brickMaterialDetail: {
    src: "/images/brick-material-detail.webp",
    width: 1024,
    height: 1536,
  },
  wayzataResidenceDusk: {
    src: "/images/wayzata-residence-dusk.webp",
    width: 1536,
    height: 1024,
  },
  oakStoneInterior: {
    src: "/images/oak-stone-interior.webp",
    width: 1024,
    height: 1536,
  },
  minnetonkaWoodlandHouse: {
    src: "/images/minnetonka-woodland-house.webp",
    width: 1536,
    height: 1024,
  },
  minneapolisConstructionFrame: {
    src: "/images/minneapolis-construction-frame.webp",
    width: 1536,
    height: 1024,
  },
  constructionDetail: {
    src: "/images/construction-detail.webp",
    width: 1024,
    height: 1536,
  },
  wisconsinBluffAerial: {
    src: "/images/wisconsin-bluff-aerial.webp",
    width: 1536,
    height: 1024,
  },
  lakeHousePanorama: {
    src: "/images/lake-house-panorama.webp",
    width: 2022,
    height: 778,
  },
  wayzataLakesideHero: {
    src: "/images/wayzata-lakeside/wayzata-hero.webp",
    width: 2200,
    height: 1466,
  },
  wayzataAerialApproach: {
    src: "/images/wayzata-lakeside/aerial-approach.webp",
    width: 2200,
    height: 1238,
  },
  wayzataEntranceDetail: {
    src: "/images/wayzata-lakeside/entrance-detail.webp",
    width: 2200,
    height: 1466,
  },
  wayzataWestGable: {
    src: "/images/wayzata-lakeside/west-gable-detail.webp",
    width: 2200,
    height: 1466,
  },
  wayzataLakefrontAerial: {
    src: "/images/wayzata-lakeside/lakefront-aerial.webp",
    width: 2200,
    height: 1238,
  },
  wayzataLakesideContext: {
    src: "/images/wayzata-lakeside/lakeside-context.webp",
    width: 2200,
    height: 1238,
  },
  wayzataLakefrontClose: {
    src: "/images/wayzata-lakeside/lakefront-close.webp",
    width: 2200,
    height: 1466,
  },
  wayzataPorchLakeview: {
    src: "/images/wayzata-lakeside/porch-lakeview.webp",
    width: 2200,
    height: 1466,
  },
  wayzataSoffitDetail: {
    src: "/images/wayzata-lakeside/soffit-detail.webp",
    width: 2200,
    height: 1466,
  },
  iconHomesHero: {
    src: "/images/icon-homes/icon-homes-hero.webp",
    width: 2200,
    height: 1226,
  },
  iconHomesFrontThreeQuarter: {
    src: "/images/icon-homes/front-three-quarter.webp",
    width: 2200,
    height: 1372,
  },
  iconHomesEntranceWide: {
    src: "/images/icon-homes/entrance-wide.webp",
    width: 2200,
    height: 1466,
  },
  iconHomesEntranceDetail: {
    src: "/images/icon-homes/entrance-detail.webp",
    width: 2200,
    height: 1440,
  },
  iconHomesEntranceView: {
    src: "/images/icon-homes/entrance-view.webp",
    width: 2200,
    height: 1544,
  },
  iconHomesCenterDetail: {
    src: "/images/icon-homes/center-detail.webp",
    width: 2200,
    height: 1466,
  },
  iconHomesAerialFront: {
    src: "/images/icon-homes/aerial-front.webp",
    width: 2200,
    height: 1238,
  },
  iconHomesAerialContext: {
    src: "/images/icon-homes/aerial-context.webp",
    width: 2200,
    height: 1238,
  },
  iconHomesAerialBackyard: {
    src: "/images/icon-homes/aerial-backyard.webp",
    width: 2200,
    height: 1238,
  },
  iconHomesRearGables: {
    src: "/images/icon-homes/rear-gables.webp",
    width: 2200,
    height: 1238,
  },
  frederickRearElevation: {
    src: "/images/frederick-avenue/rear-elevation.webp",
    width: 2200,
    height: 1466,
  },
  frederickAerialFront: {
    src: "/images/frederick-avenue/aerial-front.webp",
    width: 2200,
    height: 1238,
  },
  frederickAerialRear: {
    src: "/images/frederick-avenue/aerial-rear.webp",
    width: 2200,
    height: 1480,
  },
  frederickRearThreeQuarter: {
    src: "/images/frederick-avenue/rear-three-quarter.webp",
    width: 2200,
    height: 1466,
  },
  frederickFrontPorch: {
    src: "/images/frederick-avenue/front-porch.webp",
    width: 2200,
    height: 1466,
  },
  frederickEntry: {
    src: "/images/frederick-avenue/entry.webp",
    width: 2200,
    height: 1466,
  },
  frederickKitchen: {
    src: "/images/frederick-avenue/kitchen.webp",
    width: 2200,
    height: 1466,
  },
  frederickKitchenHall: {
    src: "/images/frederick-avenue/kitchen-hall.webp",
    width: 2200,
    height: 1490,
  },
  frederickStoneFireplace: {
    src: "/images/frederick-avenue/stone-fireplace.webp",
    width: 2200,
    height: 1360,
  },
  frederickPrimaryBath: {
    src: "/images/frederick-avenue/primary-bath.webp",
    width: 2200,
    height: 1448,
  },
  frederickStairway: {
    src: "/images/frederick-avenue/stairway.webp",
    width: 2200,
    height: 1466,
  },
  frederickPrimaryBedroom: {
    src: "/images/frederick-avenue/primary-bedroom.webp",
    width: 2200,
    height: 1466,
  },
} as const satisfies Record<string, ImageAsset>;
