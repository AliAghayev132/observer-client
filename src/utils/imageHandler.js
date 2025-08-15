// Variables
import { IMAGE_BASE_URL, leaderImagePath } from "@/constants";
// Paths
import { categoryImagePath, userProfilePicturePath } from "@/constants";
/**
 * Görselin tam URL'ini döner.
 * @param path API'den gelen görselin path'i (örn: "/uploads/categories/abc.png")
 * @returns Tam URL (örn: "https://example.com/uploads/categories/abc.png")
 */
export var getImageUrl = function (path) {
    if (!path)
        return "/placeholder.png"; // fallback image
    // Eğer path zaten tam URL ise direkt döndür
    if (path.startsWith("http"))
        return path;
    return "".concat(IMAGE_BASE_URL).concat(path);
};
/**
 * Kategori görselleri için özel handler.
 * @param imageName Sadece dosya adı (örn: "abc.png")
 */
export var getCategoryImageUrl = function (imageName) {
    if (!imageName)
        return "/placeholder-category.png";
    return "".concat(IMAGE_BASE_URL).concat(categoryImagePath).concat(imageName);
};
// utils/imageHandler.ts (add this to your existing file)
export var getLeaderImage = function (imageName) {
    if (!imageName)
        return "/placeholder-leader.png";
    return "".concat(IMAGE_BASE_URL).concat(leaderImagePath).concat(imageName);
};
export var getUserProfilePictureUrl = function (imageName) {
    if (!imageName)
        return "/placeholder-user.png"; // fallback image
    if (imageName.startsWith("http"))
        return imageName;
    return "".concat(IMAGE_BASE_URL).concat(userProfilePicturePath).concat(imageName);
};
