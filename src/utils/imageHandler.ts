// Variables
import { IMAGE_BASE_URL, leaderImagePath } from "@/constants";
// Paths
import { categoryImagePath, userProfilePicturePath } from "@/constants";

/**
 * Görselin tam URL'ini döner.
 * @param path API'den gelen görselin path'i (örn: "/uploads/categories/abc.png")
 * @returns Tam URL (örn: "https://example.com/uploads/categories/abc.png")
 */
export const getImageUrl = (path?: string): string => {
  if (!path) return "/placeholder.png"; // fallback image
  // Eğer path zaten tam URL ise direkt döndür
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}${path}`;
};

/**
 * Kategori görselleri için özel handler.
 * @param imageName Sadece dosya adı (örn: "abc.png")
 */
export const getCategoryImageUrl = (imageName?: string): string => {
  if (!imageName) return "/placeholder-category.png";
  return `${IMAGE_BASE_URL}${categoryImagePath}${imageName}`;
};

// utils/imageHandler.ts (add this to your existing file)

export const getLeaderImage = (imageName?: string): string => {
  if (!imageName) return "/placeholder-leader.png";
  return `${IMAGE_BASE_URL}${leaderImagePath}${imageName}`;
};

export const getUserProfilePictureUrl = (imageName?: string): string => {
  if (!imageName) return "/placeholder-user.png"; // fallback image
  if (imageName.startsWith("http")) return imageName;
  return `${IMAGE_BASE_URL}${userProfilePicturePath}${imageName}`;
};
