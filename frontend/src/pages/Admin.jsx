import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  PlusCircle,
  Trash2,
  Check,
  Search,
  ExternalLink,
  ShoppingBag,
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Eye,
  EyeOff,
  Database,
  RefreshCw,
  Pencil,
  X,
  UploadCloud,
  AlertTriangle,
} from "lucide-react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
  uploadImage,
} from "../api/client";
// Update helpers. These use the same API base as the rest of the app.
// Set VITE_API_URL to your backend URL (without a trailing slash).
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const getAuthHeaders = (extra = {}) => {
  const token = localStorage.getItem("subani_admin_token");
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const updateProduct = async (id, payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok
      ? { success: true, data: data.data ?? data }
      : {
          success: false,
          error: data.error || data.message || "Failed to update product",
        };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error while updating product",
    };
  }
};

const updateGalleryItem = async (id, payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "PUT",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok
      ? { success: true, data: data.data ?? data }
      : {
          success: false,
          error: data.error || data.message || "Failed to update gallery item",
        };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error while updating gallery item",
    };
  }
};

// Corporate Brand Constants
const PRIMARY = "#C8102E";
const ACCENT = "#F4B400";
const DARK = "#111827";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";

const PRESET_DIVISIONS = [
  {
    id: "KOOLATH SUPERMARKET",
    label: "Koolath Supermarket",
    whatsapp: "917510116699",
  },
  {
    id: "KOOLATH MILLING COMPANY",
    label: "Koolath Milling Co.",
    whatsapp: "917510116699",
  },
  {
    id: "IFTAR FOOD INDUSTRIES",
    label: "Iftar Food Industries",
    whatsapp: "917510116688",
  },
];

const PRESET_CATEGORIES = [
  "Rice & Grains",
  "Pulses & Lentils",
  "Spices & Packaged Flours",
  "Oils, Sauces & Essentials",
  "Disposables & Packaging",
  "Provisions, Bakery & Feeds",
  "Flours & Podi",
  "Spices & Powders",
  "Edible Oils",
  "Traditional Provisions",
];

const VENTURE_CATEGORIES = [
  "KOOLATH GROUP OF COMPANIES",
  "SUBANI KOOLATH SUPERMARKET",
  "IFTAR FOOD INDUSTRIES",
  "ARCHEND BUILDERS",
  "KOOLATH ENTERPRISES",
];

// Quick Unsplash image templates
const SAMPLE_IMAGES = [
  {
    label: "Rice",
    url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Spices",
    url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Pulses",
    url: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Oils",
    url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Store",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("subani_admin_auth") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab: "products" or "gallery"
  const [activeTab, setActiveTab] = useState("products");

  // Products Data & Form
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productDivisionFilter, setProductDivisionFilter] = useState("All");

  const [productForm, setProductForm] = useState({
    name: "",
    brand: "KOOLATH SUPERMARKET",
    category: "Rice & Grains",
    price: "Available per kg",
    unit: "kg",
    variants: "",
    specs: "100% Pure, Quality Checked, Hygienically Packed",
    description: "",
    image: "",
    fallback: FALLBACK_IMAGE,
    whatsapp: "917510116699",
  });
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);

  // Gallery Data & Form
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "KOOLATH GROUP OF COMPANIES",
    tagline: "GROUP ENTERPRISE",
    image: "",
    isLogo: false,
    order: 1,
  });
  const [isSubmittingGallery, setIsSubmittingGallery] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [isUploadingGalleryImage, setIsUploadingGalleryImage] = useState(false);

  // Toast message
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Custom Confirmation Popup Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    name: "",
    type: "product", // "product" or "gallery"
    isDeleting: false,
  });

  // Load Noto Sans globally for this admin dashboard.
  useEffect(() => {
    const existing = document.getElementById("subani-noto-sans");
    if (existing) return;
    const link = document.createElement("link");
    link.id = "subani-noto-sans";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  // Load Products
  const loadProducts = async () => {
    setLoadingProducts(true);
    const res = await getProducts();
    if (res.success) {
      setProducts(res.data);
    }
    setLoadingProducts(false);
  };

  // Load Gallery
  const loadGallery = async () => {
    setLoadingGallery(true);
    const res = await getGalleryItems();
    if (res.success) {
      setGalleryItems(res.data);
    }
    setLoadingGallery(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadGallery();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid username or password");
      }

      localStorage.setItem("subani_admin_token", data.token || "");
      sessionStorage.setItem("subani_admin_auth", "true");
      setIsAuthenticated(true);
      showToast("Welcome to Admin Dashboard!");
    } catch (error) {
      setAuthError(error.message || "Invalid username or password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("subani_admin_token");
    sessionStorage.removeItem("subani_admin_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    showToast("Signed out successfully", "info");
  };

  // Product Brand Change (auto-updates default WhatsApp)
  const handleBrandChange = (brand) => {
    const matched = PRESET_DIVISIONS.find((d) => d.id === brand);
    setProductForm((prev) => ({
      ...prev,
      brand,
      whatsapp: matched ? matched.whatsapp : prev.whatsapp,
    }));
  };

  // Handle Product Image File Upload to /uploads
  const handleProductFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("Image file size exceeds 10MB limit", "error");
      return;
    }

    const prevImage = productForm.image;
    const tempUrl = URL.createObjectURL(file);
    setProductForm((prev) => ({
      ...prev,
      image: tempUrl,
    }));

    setIsUploadingProductImage(true);
    const res = await uploadImage(file);
    if (res.success && res.imageUrl) {
      setProductForm((prev) => ({
        ...prev,
        image: res.imageUrl,
      }));
      showToast("Image uploaded & saved to /uploads folder!");
    } else {
      setProductForm((prev) => ({
        ...prev,
        image: prevImage,
      }));
      showToast(res.error || "Failed to upload image", "error");
    }
    setIsUploadingProductImage(false);
    e.target.value = "";
  };

  // Handle Gallery Image File Upload to /uploads
  const handleGalleryFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("Image file size exceeds 10MB limit", "error");
      return;
    }

    const prevImage = galleryForm.image;
    const tempUrl = URL.createObjectURL(file);
    setGalleryForm((prev) => ({
      ...prev,
      image: tempUrl,
    }));

    setIsUploadingGalleryImage(true);
    const res = await uploadImage(file);
    if (res.success && res.imageUrl) {
      setGalleryForm((prev) => ({
        ...prev,
        image: res.imageUrl,
      }));
      showToast("Gallery image uploaded & saved to /uploads folder!");
    } else {
      setGalleryForm((prev) => ({
        ...prev,
        image: prevImage,
      }));
      showToast(res.error || "Failed to upload image", "error");
    }
    setIsUploadingGalleryImage(false);
    e.target.value = "";
  };

  // Add / Edit Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast("Please enter a product name", "error");
      return;
    }

    setIsSubmittingProduct(true);
    const specsArray = productForm.specs
      ? productForm.specs
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : ["100% Pure", "Quality Checked"];

    const variantsArray = productForm.variants
      ? productForm.variants
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

    const payload = {
      name: productForm.name.trim(),
      brand: productForm.brand,
      category: productForm.category.trim(),
      price: productForm.price.trim() || "Available on Request",
      specs: specsArray,
      description:
        productForm.description.trim() ||
        `High quality ${productForm.name} supplied by ${productForm.brand}.`,
      image: productForm.image.trim() || productForm.fallback,
      fallback: productForm.fallback,
      whatsapp: productForm.whatsapp.trim(),
      unit: productForm.unit.trim(),
      variants: variantsArray,
    };

    const res = editingProductId
      ? await updateProduct(editingProductId, payload)
      : await createProduct(payload);

    if (res.success) {
      showToast(
        editingProductId
          ? `Product "${payload.name}" updated successfully!`
          : `Product "${payload.name}" added successfully!`,
      );
      setEditingProductId(null);
      setProductForm({
        name: "",
        brand: productForm.brand,
        category: productForm.category,
        price: "Available on Request",
        unit: "kg",
        variants: "",
        specs: "100% Pure, Quality Checked, Hygienically Packed",
        description: "",
        image: "",
        fallback: FALLBACK_IMAGE,
        whatsapp: productForm.whatsapp,
      });
      loadProducts();
    } else {
      showToast(
        res.error ||
          (editingProductId
            ? "Failed to update product"
            : "Failed to create product"),
        "error",
      );
    }
    setIsSubmittingProduct(false);
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id || product.id);
    setProductForm({
      name: product.name || "",
      brand: product.brand || PRESET_DIVISIONS[0].id,
      category: product.category || PRESET_CATEGORIES[0],
      price: product.price || "Available on Request",
      unit: product.unit || "kg",
      variants: Array.isArray(product.variants)
        ? product.variants.join(", ")
        : product.variants || "",
      specs: Array.isArray(product.specs)
        ? product.specs.join(", ")
        : product.specs || "",
      description: product.description || "",
      image: product.image || "",
      fallback: product.fallback || FALLBACK_IMAGE,
      whatsapp: product.whatsapp || "917510116699",
    });
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelProductEdit = () => {
    setEditingProductId(null);
    setProductForm((prev) => ({
      ...prev,
      name: "",
      price: "Available on Request",
      variants: "",
      specs: "100% Pure, Quality Checked, Hygienically Packed",
      description: "",
      image: "",
      fallback: FALLBACK_IMAGE,
    }));
  };

  // Custom Delete Modal Triggers
  const promptDeleteProduct = (id, name) => {
    setDeleteModal({
      isOpen: true,
      id,
      name,
      type: "product",
      isDeleting: false,
    });
  };

  const promptDeleteGallery = (id, title) => {
    setDeleteModal({
      isOpen: true,
      id,
      name: title,
      type: "gallery",
      isDeleting: false,
    });
  };

  const closeDeleteModal = () => {
    if (deleteModal.isDeleting) return;
    setDeleteModal({
      isOpen: false,
      id: null,
      name: "",
      type: "product",
      isDeleting: false,
    });
  };

  // Confirmed Delete Action Handler
  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;
    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    if (deleteModal.type === "product") {
      const res = await deleteProduct(deleteModal.id);
      if (res.success) {
        showToast(`Deleted "${deleteModal.name}" from MongoDB`);
        setProducts((prev) =>
          prev.filter(
            (p) => p._id !== deleteModal.id && p.id !== deleteModal.id,
          ),
        );
        setDeleteModal({
          isOpen: false,
          id: null,
          name: "",
          type: "product",
          isDeleting: false,
        });
      } else {
        showToast(res.error || "Failed to delete product", "error");
        setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
      }
    } else {
      const res = await deleteGalleryItem(deleteModal.id);
      if (res.success) {
        showToast(`Deleted "${deleteModal.name}" from MongoDB`);
        setGalleryItems((prev) =>
          prev.filter(
            (g) => g._id !== deleteModal.id && g.id !== deleteModal.id,
          ),
        );
        setDeleteModal({
          isOpen: false,
          id: null,
          name: "",
          type: "gallery",
          isDeleting: false,
        });
      } else {
        showToast(res.error || "Failed to delete gallery item", "error");
        setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
      }
    }
  };

  // Backward compatibility alias
  const handleDeleteProduct = promptDeleteProduct;

  // Handle Create Gallery Item
  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!galleryForm.title.trim()) {
      showToast("Please enter a gallery item title", "error");
      return;
    }
    if (!galleryForm.image.trim()) {
      showToast("Please provide an image URL or path", "error");
      return;
    }

    setIsSubmittingGallery(true);
    const payload = {
      title: galleryForm.title.trim(),
      category: galleryForm.category,
      tagline: galleryForm.tagline.trim(),
      image: galleryForm.image.trim(),
      isLogo: Boolean(galleryForm.isLogo),
      order: Number(galleryForm.order) || 1,
    };

    const res = editingGalleryId
      ? await updateGalleryItem(editingGalleryId, payload)
      : await createGalleryItem(payload);

    if (res.success) {
      showToast(
        editingGalleryId
          ? `Gallery item "${payload.title}" updated!`
          : `Gallery item "${payload.title}" added!`,
      );
      setEditingGalleryId(null);
      setGalleryForm({
        title: "",
        category: galleryForm.category,
        tagline: "GROUP ENTERPRISE",
        image: "",
        isLogo: false,
        order: editingGalleryId
          ? galleryForm.order
          : (Number(galleryForm.order) || 1) + 1,
      });
      loadGallery();
    } else {
      showToast(
        res.error ||
          (editingGalleryId
            ? "Failed to update gallery item"
            : "Failed to add gallery item"),
        "error",
      );
    }
    setIsSubmittingGallery(false);
  };

  const handleEditGallery = (item) => {
    setEditingGalleryId(item._id || item.id);
    setGalleryForm({
      title: item.title || "",
      category: item.category || VENTURE_CATEGORIES[0],
      tagline: item.tagline || "GROUP ENTERPRISE",
      image: item.image || "",
      isLogo: Boolean(item.isLogo),
      order: item.order || 1,
    });
    setActiveTab("gallery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelGalleryEdit = () => {
    setEditingGalleryId(null);
    setGalleryForm((prev) => ({
      ...prev,
      title: "",
      tagline: "GROUP ENTERPRISE",
      image: "",
      isLogo: false,
    }));
  };

  // Backward compatibility alias
  const handleDeleteGallery = promptDeleteGallery;

  // Filtered Products List for Admin Table
  const filteredProducts = products.filter((p) => {
    const matchesDivision =
      productDivisionFilter === "All" || p.brand === productDivisionFilter;
    const q = productSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q);
    return matchesDivision && matchesSearch;
  });

  // =========================================================================
  // VIEW: LOGIN GATE (If not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <section
        className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-16"
        style={{ fontFamily: "'Noto Sans', sans-serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
        >
          {/* Brand Emblem */}
          <div className="text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ backgroundColor: PRIMARY }}
            >
              <Lock className="h-7 w-7" />
            </div>

            <h1 className="mt-4 text-2xl font-black text-gray-900">
              Staff & Admin Portal
            </h1>
            <p className="mt-1.5 text-xs text-gray-500">
              Sign in to manage MongoDB products and gallery inventory
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-700"
            >
              {authError}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Username / Email
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-11 text-sm font-medium text-gray-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-98 disabled:opacity-70 cursor-pointer"
              style={{ backgroundColor: PRIMARY }}
            >
              {isLoggingIn ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              <span>{isLoggingIn ? "Verifying..." : "Sign In to Portal"}</span>
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-center text-[11px] text-gray-500">
            <span className="font-semibold text-gray-700">Demo Login:</span>{" "}
            Username:{" "}
            <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-red-600">
              admin
            </code>{" "}
            | Password:{" "}
            <code className="bg-white px-1 py-0.5 rounded font-mono font-bold text-red-600">
              admin123
            </code>
          </div>
        </motion.div>
      </section>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <section
      className="min-h-screen bg-gray-50/70 pb-20 pt-8"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed right-6 top-6 z-50 rounded-2xl px-5 py-3 text-xs font-bold text-white shadow-xl ${
              toast.type === "error" ? "bg-red-600" : "bg-gray-900"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation Popup Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeleteModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Popup Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl"
            >
              {/* Close X Button */}
              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={closeDeleteModal}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition cursor-pointer disabled:opacity-40"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Warning Trash Icon Circle */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-inner border border-red-100">
                <Trash2 className="h-7 w-7" />
              </div>

              {/* Title & Description */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-black text-gray-900">
                  Delete{" "}
                  {deleteModal.type === "product" ? "Product" : "Gallery Item"}?
                </h3>
                <p className="mt-1.5 text-xs text-gray-500">
                  Are you sure you want to delete this{" "}
                  {deleteModal.type === "product" ? "product" : "gallery item"}{" "}
                  from MongoDB?
                </p>
              </div>

              {/* Highlighted Item Details */}
              <div className="mt-4 rounded-2xl border border-red-100 bg-red-50/50 p-3.5 text-center">
                <p className="text-xs font-black text-gray-900 break-words">
                  "{deleteModal.name}"
                </p>
                <p className="mt-1 text-[11px] font-semibold text-red-600">
                  ⚠️ This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  disabled={deleteModal.isDeleting}
                  onClick={closeDeleteModal}
                  className="flex-1 rounded-xl border border-gray-200 bg-gray-50 py-3 text-xs font-bold text-gray-700 transition hover:bg-gray-100 active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteModal.isDeleting}
                  onClick={handleConfirmDelete}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-md transition hover:shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {deleteModal.isDeleting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Yes, Delete</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Management Header Bar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2"></div>
            <h1 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
              Subani & Koolath{" "}
              <span style={{ color: PRIMARY }}>Management</span>
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Live Database: {products.length} Products • {galleryItems.length}{" "}
              Gallery Items
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Section Tabs (Products vs Gallery) */}
        <div className="mt-6 flex gap-2 border-b border-gray-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "gallery"
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>Gallery Section ({galleryItems.length})</span>
          </button>
        </div>

        {/* ===================================================================
            TAB 1: PRODUCT MANAGEMENT
        =================================================================== */}
        {activeTab === "products" && (
          <div className="mt-8 space-y-10">
            {/* Split Row: Add Form & Live Card Preview */}
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Add Product Form */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-7">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-gray-900">
                      {editingProductId ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {editingProductId
                        ? "Update the selected product in MongoDB"
                        : "Stores directly in MongoDB database"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreateProduct} className="mt-6 space-y-4">
                  {/* Division Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Brand / Division *
                    </label>
                    <select
                      value={productForm.brand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-bold text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                    >
                      {PRESET_DIVISIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product Name & Category */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. Premium Basmati Rice"
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Category *
                      </label>
                      <input
                        type="text"
                        required
                        list="categories-list"
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          })
                        }
                        placeholder="Select or type category"
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                      <datalist id="categories-list">
                        {PRESET_CATEGORIES.map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  {/* Price & Unit / Variants */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Price Label
                      </label>
                      <input
                        type="text"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: e.target.value,
                          })
                        }
                        placeholder="e.g. Available per kg"
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Primary Unit
                      </label>
                      <input
                        type="text"
                        value={productForm.unit}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            unit: e.target.value,
                          })
                        }
                        placeholder="kg, Bottle, Packet"
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Variants (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={productForm.variants}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            variants: e.target.value,
                          })
                        }
                        placeholder="500g, 1kg, 5kg"
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Product Image: Upload File OR Enter URL / Path */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Product Image (Upload File or Enter URL / Path) *
                      </label>
                      {productForm.image && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          <Check className="h-3 w-3" /> Image Added
                        </span>
                      )}
                    </div>

                    {/* Direct Upload Box */}
                    <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 p-4 transition-colors hover:border-red-400 hover:bg-red-50/20">
                      <input
                        type="file"
                        id="product-file-upload"
                        accept="image/*"
                        disabled={isUploadingProductImage}
                        onChange={handleProductFileUpload}
                        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center text-center pointer-events-none">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-sm border border-gray-100">
                          {isUploadingProductImage ? (
                            <RefreshCw className="h-5 w-5 animate-spin" />
                          ) : (
                            <UploadCloud className="h-5 w-5" />
                          )}
                        </div>
                        <p className="mt-2 text-xs font-bold text-gray-800">
                          {isUploadingProductImage
                            ? "Uploading to server /uploads folder..."
                            : "Click or drag & drop to upload image file"}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Saved directly into backend{" "}
                          <code className="font-mono bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            /uploads
                          </code>{" "}
                          folder (PNG, JPG, WEBP, SVG)
                        </p>
                      </div>
                    </div>

                    {/* Dedicated Image Preview Section */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-3 shadow-2xs">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-100 text-red-700">
                            <Eye className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-bold text-gray-800">
                            Image Preview
                          </span>
                          {productForm.image ? (
                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                              Attached
                            </span>
                          ) : (
                            <span className="rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                              No image chosen
                            </span>
                          )}
                        </div>
                        {productForm.image && (
                          <button
                            type="button"
                            onClick={() =>
                              setProductForm({ ...productForm, image: "" })
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 transition cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            Clear Image
                          </button>
                        )}
                      </div>

                      {productForm.image ? (
                        <div className="mt-2.5 flex flex-col sm:flex-row items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-2.5">
                          {/* Visual Thumbnail */}
                          <div className="relative group h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
                            <img
                              src={productForm.image}
                              alt="Product Preview"
                              onError={(e) => {
                                e.currentTarget.src = FALLBACK_IMAGE;
                              }}
                              className="h-full w-full object-contain p-1 transition group-hover:scale-105"
                            />
                            <a
                              href={productForm.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold gap-1"
                            >
                              <ExternalLink className="h-3 w-3" /> View
                            </a>
                          </div>

                          {/* Image Path and Details */}
                          <div className="min-w-0 flex-1 w-full space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                Source:
                              </span>
                              <span className="text-[11px] font-bold text-gray-800 truncate">
                                {productForm.image.startsWith("blob:")
                                  ? "Local File (Uploading to Server...)"
                                  : productForm.image.includes("/uploads/")
                                    ? "Saved on Server (/uploads)"
                                    : "Linked URL / Asset Path"}
                              </span>
                            </div>
                            <p
                              className="text-[11px] font-mono text-gray-600 truncate bg-gray-50 px-2 py-1 rounded border border-gray-200/60 select-all"
                              title={productForm.image}
                            >
                              {productForm.image}
                            </p>
                            <div className="flex items-center gap-2 pt-0.5">
                              <a
                                href={productForm.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <ExternalLink className="h-3 w-3 text-gray-500" />
                                Full Resolution
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  setProductForm({ ...productForm, image: "" })
                                }
                                className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50/60 px-2 py-1 text-[10px] font-bold text-red-600 hover:bg-red-100/60 cursor-pointer"
                              >
                                <X className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-white py-4 text-center">
                          <ImageIcon className="h-5 w-5 text-gray-300" />
                          <span className="text-xs text-gray-400">
                            Upload an image above or enter a URL below to
                            preview it here
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Or Manual URL / Path Input */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-gray-500">
                          Or enter Image URL / local path:
                        </span>
                        {productForm.image && (
                          <button
                            type="button"
                            onClick={() =>
                              setProductForm({ ...productForm, image: "" })
                            }
                            className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            Clear image
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={productForm.image}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            image: e.target.value,
                          })
                        }
                        placeholder="e.g. http://localhost:5000/uploads/... or https://..."
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    {/* Quick Samples */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="font-semibold">Quick Photos:</span>
                      {SAMPLE_IMAGES.map((sample) => (
                        <button
                          key={sample.label}
                          type="button"
                          onClick={() =>
                            setProductForm({
                              ...productForm,
                              image: sample.url,
                            })
                          }
                          className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-700 hover:border-red-300 hover:text-red-600 cursor-pointer"
                        >
                          +{sample.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Features / Specs (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={productForm.specs}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          specs: e.target.value,
                        })
                      }
                      placeholder="100% Pure, Machine Cleaned, Hygienic"
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="Detailed product highlights and quality information..."
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-2">
                    {editingProductId && (
                      <button
                        type="button"
                        onClick={cancelProductEdit}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3 text-xs font-bold text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmittingProduct}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-md transition hover:shadow-lg active:scale-98 disabled:opacity-60 cursor-pointer"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      {isSubmittingProduct ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : editingProductId ? (
                        <Pencil className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      <span>
                        {isSubmittingProduct
                          ? "Saving Changes..."
                          : editingProductId
                            ? "Update Product"
                            : "Save Product "}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Real-time Live Product Preview */}
              <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  Live Card Preview
                </span>
                <p className="text-xs text-gray-500">
                  How this item will appear in the catalog
                </p>

                <div className="mt-4 flex-1">
                  <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md">
                    {/* Image Preview */}
                    <div className="relative flex h-60 w-full items-center justify-center bg-gray-50 p-4">
                      <img
                        src={productForm.image || productForm.fallback}
                        alt="Preview"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="h-full w-full object-contain"
                      />

                      {/* Category Tag */}
                      <span
                        className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-xs backdrop-blur-md"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.95)",
                          color: PRIMARY,
                        }}
                      >
                        {productForm.category || "Category"}
                      </span>

                      {/* Brand Tag */}
                      <span
                        className="absolute right-3 top-3 rounded-md px-2.5 py-1 text-[9px] font-extrabold tracking-wider uppercase text-white shadow-xs"
                        style={{
                          backgroundColor:
                            productForm.brand === "IFTAR FOOD INDUSTRIES"
                              ? "rgba(200, 16, 46, 0.9)"
                              : productForm.brand === "KOOLATH SUPERMARKET"
                                ? "rgba(5, 150, 105, 0.92)"
                                : "rgba(0, 0, 0, 0.75)",
                        }}
                      >
                        {productForm.brand}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-900">
                        {productForm.name || "Product Name"}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                        {productForm.description ||
                          "Product description will appear here."}
                      </p>

                      {/* Specs */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {(productForm.specs
                          ? productForm.specs.split(",").filter(Boolean)
                          : ["Sample Spec"]
                        ).map((s, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700"
                          >
                            <Check className="h-2.5 w-2.5" />
                            {s.trim()}
                          </span>
                        ))}
                      </div>

                      {/* Price & Action */}
                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                        <div>
                          <span className="block text-[9px] font-bold uppercase text-gray-400">
                            Pricing
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {productForm.price || "Available on Request"}
                          </span>
                        </div>

                        <div
                          className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          <MessageCircle className="h-3 w-3" />
                          <span>Inquire</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing MongoDB Products Table */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    Live Products
                  </h2>
                  <p className="text-xs text-gray-500">
                    Showing {filteredProducts.length} of {products.length} total
                    items
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search inventory..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-3 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <select
                    value={productDivisionFilter}
                    onChange={(e) => setProductDivisionFilter(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50/50 p-2 text-xs font-bold text-gray-800 outline-none"
                  >
                    <option value="All">All Divisions</option>
                    <option value="KOOLATH SUPERMARKET">
                      Koolath Supermarket
                    </option>
                    <option value="KOOLATH MILLING COMPANY">
                      Koolath Milling Co.
                    </option>
                    <option value="IFTAR FOOD INDUSTRIES">
                      Iftar Food Industries
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={loadProducts}
                    className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                    title="Reload from MongoDB"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${loadingProducts ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Table / List */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gray-200 bg-gray-50/60 text-gray-600">
                    <tr>
                      <th className="py-3 px-4 font-bold uppercase">Product</th>
                      <th className="py-3 px-4 font-bold uppercase">
                        Division
                      </th>
                      <th className="py-3 px-4 font-bold uppercase">
                        Category
                      </th>
                      <th className="py-3 px-4 font-bold uppercase">Price</th>
                      <th className="py-3 px-4 font-bold uppercase text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((prod) => (
                      <tr
                        key={prod._id || prod.id}
                        className="hover:bg-gray-50/80"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                prod.image || prod.fallback || FALLBACK_IMAGE
                              }
                              alt={prod.name}
                              onError={(e) => {
                                e.currentTarget.src = FALLBACK_IMAGE;
                              }}
                              className="h-10 w-10 shrink-0 rounded-lg object-contain bg-gray-100 p-1 border border-gray-200"
                            />
                            <div>
                              <span className="font-bold text-gray-900 block">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {prod.specs?.slice(0, 2).join(" • ")}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="inline-block rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase"
                            style={{
                              backgroundColor:
                                prod.brand === "IFTAR FOOD INDUSTRIES"
                                  ? "rgba(200, 16, 46, 0.1)"
                                  : prod.brand === "KOOLATH SUPERMARKET"
                                    ? "rgba(5, 150, 105, 0.1)"
                                    : "rgba(0, 0, 0, 0.08)",
                              color:
                                prod.brand === "IFTAR FOOD INDUSTRIES"
                                  ? "#C8102E"
                                  : prod.brand === "KOOLATH SUPERMARKET"
                                    ? "#059669"
                                    : "#111827",
                            }}
                          >
                            {prod.brand}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-600">
                          {prod.category}
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-800">
                          {prod.price}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(prod)}
                              className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                              title="Edit product"
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteProduct(
                                  prod._id || prod.id,
                                  prod.name,
                                )
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50/60 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 transition cursor-pointer"
                              title="Delete from MongoDB"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="py-12 text-center text-xs text-gray-400">
                    No products found matching your search.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: GALLERY MANAGEMENT
        =================================================================== */}
        {activeTab === "gallery" && (
          <div className="mt-8 space-y-10">
            {/* Split Row: Add Gallery Form & Preview */}
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Form */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-7">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-gray-900">
                      {editingGalleryId
                        ? "Edit Gallery Item"
                        : "Add New Gallery Item"}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {editingGalleryId
                        ? "Update the selected gallery item in MongoDB"
                        : "Stores directly in MongoDB database"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreateGallery} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Venture / Category *
                    </label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          category: e.target.value,
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-bold text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                    >
                      {VENTURE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={galleryForm.title}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Automated Grain Processing Line"
                      className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Tagline / Subtitle
                      </label>
                      <input
                        type="text"
                        value={galleryForm.tagline}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            tagline: e.target.value,
                          })
                        }
                        placeholder="e.g. MILLING & PACKAGING"
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={galleryForm.order}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            order: e.target.value,
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Gallery Image: Upload File OR Enter URL / Path */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                        Gallery Image (Upload File or Enter URL / Path) *
                      </label>
                      {galleryForm.image && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          <Check className="h-3 w-3" /> Image Added
                        </span>
                      )}
                    </div>

                    {/* Direct Upload Box */}
                    <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 p-4 transition-colors hover:border-red-400 hover:bg-red-50/20">
                      <input
                        type="file"
                        id="gallery-file-upload"
                        accept="image/*"
                        disabled={isUploadingGalleryImage}
                        onChange={handleGalleryFileUpload}
                        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center text-center pointer-events-none">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-sm border border-gray-100">
                          {isUploadingGalleryImage ? (
                            <RefreshCw className="h-5 w-5 animate-spin" />
                          ) : (
                            <UploadCloud className="h-5 w-5" />
                          )}
                        </div>
                        <p className="mt-2 text-xs font-bold text-gray-800">
                          {isUploadingGalleryImage
                            ? "Uploading to server /uploads folder..."
                            : "Click or drag & drop to upload gallery image"}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Saved directly into backend{" "}
                          <code className="font-mono bg-gray-200 px-1 py-0.5 rounded text-gray-800">
                            /uploads
                          </code>{" "}
                          folder (PNG, JPG, WEBP, SVG)
                        </p>
                      </div>
                    </div>

                    {/* Dedicated Image Preview Section */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-3 shadow-2xs">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-100 text-red-700">
                            <Eye className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-bold text-gray-800">
                            Image Preview
                          </span>
                          {galleryForm.image ? (
                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                              Attached
                            </span>
                          ) : (
                            <span className="rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                              No image chosen
                            </span>
                          )}
                        </div>
                        {galleryForm.image && (
                          <button
                            type="button"
                            onClick={() =>
                              setGalleryForm({ ...galleryForm, image: "" })
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 transition cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            Clear Image
                          </button>
                        )}
                      </div>

                      {galleryForm.image ? (
                        <div className="mt-2.5 flex flex-col sm:flex-row items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-2.5">
                          {/* Visual Thumbnail */}
                          <div className="relative group h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
                            <img
                              src={galleryForm.image}
                              alt="Gallery Preview"
                              onError={(e) => {
                                e.currentTarget.src = FALLBACK_IMAGE;
                              }}
                              className="h-full w-full object-contain p-1 transition group-hover:scale-105"
                            />
                            <a
                              href={galleryForm.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold gap-1"
                            >
                              <ExternalLink className="h-3 w-3" /> View
                            </a>
                          </div>

                          {/* Image Path and Details */}
                          <div className="min-w-0 flex-1 w-full space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                Source:
                              </span>
                              <span className="text-[11px] font-bold text-gray-800 truncate">
                                {galleryForm.image.startsWith("blob:")
                                  ? "Local File (Uploading to Server...)"
                                  : galleryForm.image.includes("/uploads/")
                                    ? "Saved on Server (/uploads)"
                                    : "Linked URL / Asset Path"}
                              </span>
                            </div>
                            <p
                              className="text-[11px] font-mono text-gray-600 truncate bg-gray-50 px-2 py-1 rounded border border-gray-200/60 select-all"
                              title={galleryForm.image}
                            >
                              {galleryForm.image}
                            </p>
                            <div className="flex items-center gap-2 pt-0.5">
                              <a
                                href={galleryForm.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-700 hover:bg-gray-50"
                              >
                                <ExternalLink className="h-3 w-3 text-gray-500" />
                                Full Resolution
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  setGalleryForm({ ...galleryForm, image: "" })
                                }
                                className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50/60 px-2 py-1 text-[10px] font-bold text-red-600 hover:bg-red-100/60 cursor-pointer"
                              >
                                <X className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-white py-4 text-center">
                          <ImageIcon className="h-5 w-5 text-gray-300" />
                          <span className="text-xs text-gray-400">
                            Upload an image above or enter a URL below to
                            preview it here
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Or Manual URL / Path Input */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-gray-500">
                          Or enter Image URL / local path:
                        </span>
                        {galleryForm.image && (
                          <button
                            type="button"
                            onClick={() =>
                              setGalleryForm({ ...galleryForm, image: "" })
                            }
                            className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            Clear image
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={galleryForm.image}
                        onChange={(e) =>
                          setGalleryForm({
                            ...galleryForm,
                            image: e.target.value,
                          })
                        }
                        placeholder="e.g. http://localhost:5000/uploads/... or https://..."
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="font-semibold">Quick Photo:</span>
                      {SAMPLE_IMAGES.map((sample) => (
                        <button
                          key={sample.label}
                          type="button"
                          onClick={() =>
                            setGalleryForm({
                              ...galleryForm,
                              image: sample.url,
                            })
                          }
                          className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-700 hover:border-red-300 hover:text-red-600 cursor-pointer"
                        >
                          +{sample.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isLogoCheck"
                      checked={galleryForm.isLogo}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          isLogo: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label
                      htmlFor="isLogoCheck"
                      className="text-xs font-semibold text-gray-700"
                    >
                      This is a brand logo emblem (renders centered on light
                      gradient)
                    </label>
                  </div>

                  <div className="flex gap-2">
                    {editingGalleryId && (
                      <button
                        type="button"
                        onClick={cancelGalleryEdit}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-3 text-xs font-bold text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmittingGallery}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white shadow-md transition hover:shadow-lg active:scale-98 disabled:opacity-60 cursor-pointer"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      {isSubmittingGallery ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : editingGalleryId ? (
                        <Pencil className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      <span>
                        {isSubmittingGallery
                          ? "Saving Changes..."
                          : editingGalleryId
                            ? "Update Gallery Item"
                            : "Save Gallery Item "}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Live Preview */}
              <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  Live Gallery Card Preview
                </span>
                <p className="text-xs text-gray-500">
                  Real-time preview of portfolio card
                </p>

                <div className="mt-4 flex-1">
                  <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-900 shadow-md">
                    <img
                      src={galleryForm.image || FALLBACK_IMAGE}
                      alt="Preview"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className={`h-full w-full ${
                        galleryForm.isLogo
                          ? "object-contain p-8 bg-gray-100"
                          : "object-cover"
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div>
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          <Sparkles className="h-2.5 w-2.5 text-yellow-400" />
                          {galleryForm.category}
                        </span>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 block">
                            {galleryForm.tagline || "TAGLINE"}
                          </span>
                          <h3 className="mt-1 text-lg font-black text-white sm:text-xl">
                            {galleryForm.title || "Gallery Item Title"}
                          </h3>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-md">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing MongoDB Gallery Items Table */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-gray-900">
                    Live Gallery Items in MongoDB
                  </h2>
                  <p className="text-xs text-gray-500">
                    Total: {galleryItems.length} items
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadGallery}
                  className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                  title="Reload from MongoDB"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loadingGallery ? "animate-spin" : ""}`}
                  />
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs"
                  >
                    <div className="relative h-44 w-full bg-gray-100 flex items-center justify-center p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-[9px] font-bold text-gray-700 shadow-xs">
                        Order #{item.order || 0}
                      </span>
                    </div>

                    <div className="p-4">
                      <span
                        className="text-[10px] font-extrabold uppercase tracking-wider block"
                        style={{ color: PRIMARY }}
                      >
                        {item.category}
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-gray-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {item.tagline || "—"}
                      </p>

                      <div className="mt-3 flex justify-end border-t border-gray-100 pt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditGallery(item)}
                            className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                          >
                            <Pencil className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteGallery(
                                item._id || item.id,
                                item.title,
                              )
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 transition cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {galleryItems.length === 0 && (
                <div className="py-12 text-center text-xs text-gray-400">
                  No gallery items found in MongoDB.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
