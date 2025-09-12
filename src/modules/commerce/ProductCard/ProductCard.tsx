/**
 * @file src/modules/commerce/ProductCard/ProductCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * E-commerce product display card
 */
import React from "react";
import { clsx } from "clsx";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Button } from "../../../components/core/Button/Button";
import { Icon } from "../../../components/core/Icon";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt?: string;
  badge?: string;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
  href?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  imageAlt,
  badge,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  href,
  className,
}) => {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  return (
    <div
      className={clsx(
        "group relative bg-brutal-white border-4 border-brutal-black shadow-brutal",
        "hover:shadow-brutal-md hover:-translate-y-0.5 transition-all duration-300",
        className,
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-brutal-pink border-2 border-brutal-black">
          <span className="text-xs font-black uppercase">{badge}</span>
        </div>
      )}

      {/* Favorite button */}
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(id)}
          className={clsx(
            "absolute top-2 right-2 z-10 p-2",
            "bg-brutal-white border-2 border-brutal-black",
            "hover:bg-brutal-pink transition-colors",
            isFavorite && "bg-brutal-pink",
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Icon
            icon={FaHeart}
            size="sm"
            className={isFavorite ? "text-brutal-white" : "text-brutal-black"}
          />
        </button>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-brutal-gray-100">
        {href ? (
          <a href={href}>
            <img
              src={image}
              alt={imageAlt || name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>
        ) : (
          <img
            src={image}
            alt={imageAlt || name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 border-t-4 border-brutal-black">
        <h3 className="text-lg font-black uppercase tracking-wider mb-2 line-clamp-2">
          {href ? (
            <a href={href} className="hover:text-brutal-pink transition-colors">
              {name}
            </a>
          ) : (
            name
          )}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black">${price}</span>
          {originalPrice && (
            <>
              <span className="text-lg line-through text-brutal-gray-500">
                ${originalPrice}
              </span>
              <span className="text-sm font-black text-brutal-coral uppercase">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to cart */}
        {onAddToCart && (
          <Button
            onClick={() => onAddToCart(id)}
            variant="primary"
            brutal
            size="sm"
            className="w-full"
            leftIcon={() => <FaShoppingCart />}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};
