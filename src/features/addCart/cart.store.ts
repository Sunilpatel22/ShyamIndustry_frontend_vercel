import { create } from 'zustand';
import { cartApiService } from './cart.api'; // Ensure path alignment matches structure
import toast from 'react-hot-toast'; // Named default import syntax protection

export const useCartStore = create((set, get) => ({
    cartItems: [],
    totalBadgeCount: 0,
    isLoading: false,

    // 🛒 Add item handler with React-Hot-Toast Integration
    // 🛒 Add item handler with React-Hot-Toast Integration
    addToCart: async (productId, quantity = 1) => {
        try {
            set({ isLoading: true });
            const res = await cartApiService.addToCart(productId, quantity);

            // 🎯 Loosened evaluation guard to accept any valid response packet or success token
            if (res) {
                await get().fetchCart();

                // 🎉 PREMIUM SUCCESS POPUP NOTIFICATION (Fires straight to top-right viewport)
                toast.success('Product successfully added to cart!', {
                    position: 'top-right',
                    style: {
                        background: '#0f172a', // Dark theme matching slate-900 palette
                        color: '#ffffff',
                        border: '1px solid #1e293b'
                    },
                    iconTheme: {
                        primary: '#52C5C3', // Accent match for Shyam Industries theme colors
                        secondary: '#0f172a',
                    },
                });
            }
        } catch (err) {
            console.error("Add to cart error details:", err.message);

            // ❌ INSTANT ERROR TOASTER NOTIFICATION FALLBACK
            toast.error(err.response?.data?.message || 'Unable to save product addition changes.', {
                position: 'top-right',
                style: {
                    background: '#fef2f2', // Crisp crimson red error panel frame box 
                    color: '#991b1b',
                    border: '1px solid #fee2e2'
                },
                iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fef2f2',
                }
            });
        } finally {
            set({ isLoading: false });
        }
    },


    // 📋 Fetch and synchronize cart contents
    fetchCart: async () => {
        try {
            set({ isLoading: true });
            const data = await cartApiService.getCart();
            const items = data.items || [];
            const total = items.reduce((sum, item) => sum + item.quantity, 0);
            set({ cartItems: items, totalBadgeCount: total });
        } catch (err) {
            console.error("❌ Cart sync failed:", err.message);
        } finally {
            set({ isLoading: false });
        }
    },

    // 🔄 Update specific product row quantities
    updateCartQuantity: async (productId, quantity) => {
        try {
            const res = await cartApiService.updateQuantity(productId, quantity);
            if (res.success || res) await get().fetchCart();
        } catch (err) {
            console.error("❌ Updating quantity failed:", err.message);
        }
    },

    // ❌ Remove an item row from database completely
    removeItem: async (productId) => {
        try {
            const res = await cartApiService.removeFromCart(productId);
            if (res.success || res) await get().fetchCart();
        } catch (err) {
            console.error("❌ Removing item failed:", err.message);
        }
    },

    // 🧹 Clear cached data on logout
    clearCartStore: () => set({ cartItems: [], totalBadgeCount: 0 })
}));