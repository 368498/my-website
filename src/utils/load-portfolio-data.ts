// Utility functions for portfolio data handling

// Helper function to get image URL from Strapi
export function getStrapiImageUrl(image: any) {
  if (!image) return null;
  
  if (image.url) {
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
    return image.url.startsWith('http') ? image.url : `${cmsUrl}${image.url}`;
  }
  
  return null;
}

// Helper function to format Strapi data
export function formatStrapiData(data: any) {
  if (data?.data) {
    return Array.isArray(data.data) ? data.data : data.data;
  }
  return data;
}

