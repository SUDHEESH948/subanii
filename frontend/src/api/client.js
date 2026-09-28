const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://subani.in/api";

const getAuthHeaders = (extra = {}) => {
  const token = localStorage.getItem("subani_admin_token");
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Fetch products from MongoDB backend
 * @param {Object} options - { division, category, search }
 * @returns {Promise<{ success: boolean, data: Array, count: number, error?: string }>}
 */
export async function getProducts(options = {}) {
  try {
    const params = new URLSearchParams();
    if (options.division && options.division !== "All") {
      params.append("division", options.division);
    }
    if (options.category && options.category !== "All") {
      params.append("category", options.category);
    }
    if (options.search && options.search.trim() !== "") {
      params.append("search", options.search.trim());
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ""}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || [],
      count: data.count || 0,
    };
  } catch (error) {
    console.warn("[API] Could not fetch products from backend:", error.message);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
}

/**
 * Create a new product in MongoDB
 * @param {Object} productData
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function createProduct(productData) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("[API] Error creating product:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Delete a product from MongoDB
 * @param {string} id
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders({
        Accept: "application/json",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("[API] Error deleting product:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch gallery items from MongoDB backend
 * @param {Object} options - { category }
 * @returns {Promise<{ success: boolean, data: Array, count: number, error?: string }>}
 */
export async function getGalleryItems(options = {}) {
  try {
    const params = new URLSearchParams();
    if (options.category && options.category !== "All") {
      params.append("category", options.category);
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/gallery${queryString ? `?${queryString}` : ""}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || [],
      count: data.count || 0,
    };
  } catch (error) {
    console.warn("[API] Could not fetch gallery from backend:", error.message);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
}

/**
 * Create a new gallery item in MongoDB
 * @param {Object} itemData
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export async function createGalleryItem(itemData) {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: "POST",
      headers: getAuthHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(itemData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("[API] Error creating gallery item:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Delete a gallery item from MongoDB
 * @param {string} id
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function deleteGalleryItem(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders({
        Accept: "application/json",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("[API] Error deleting gallery item:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Upload an image file to backend/uploads
 * @param {File} file
 * @returns {Promise<{ success: boolean, imageUrl?: string, filename?: string, path?: string, error?: string }>}
 */
export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return {
      success: true,
      imageUrl: data.imageUrl,
      filename: data.filename,
      path: data.path,
    };
  } catch (error) {
    console.error("[API] Upload error:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}
