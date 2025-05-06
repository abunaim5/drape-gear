import { getAxiosSecure } from "@/lib/axiosSecure";
import { AvailabilityType, CategoryType, ProductListType, ProductResponseType, ProductType } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk('add/addProduct', async (newProduct: ProductListType) => {
    const axiosSecure = await getAxiosSecure();
    const res = await axiosSecure.post('/addProduct', { newProduct });
    return res.data;
});

export const updateProduct = createAsyncThunk('update/updateProduct', async ({ updatedData, id }: { updatedData: ProductListType, id: string }) => {
    const axiosSecure = await getAxiosSecure();
    const res = await axiosSecure.patch(`/products/${id}`, { updatedData });
    return res.data;
});

export const removeProduct = createAsyncThunk('remove/removeProduct', async (id: string) => {
    const axiosSecure = await getAxiosSecure();
    const res = await axiosSecure.post('/removeProduct', { id });
    return res.data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ currentPage, itemsPerPage, collection, category, availability, sortPriceVal }: { currentPage: number, itemsPerPage: number, collection: string, category: string[], availability: boolean[], sortPriceVal: string }) => {
    const categoryQuery = category.length > 0 ? `&category=${category.join(',')}` : '';
    const availabilityQuery = availability.length > 0 ? `&availability=${availability.join(',')}` : '';
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=${currentPage}&size=${itemsPerPage}&filter=${collection}&sort=${sortPriceVal}${categoryQuery}${availabilityQuery}`);
    return res.data;
});

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async () => {
    const axiosSecure = await getAxiosSecure();
    const res = await axiosSecure.get('/allProducts');
    return res.data;
});

export const fetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProduct', async (id: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`);
    return res.data.product;
});

export const fetchProductCount = createAsyncThunk('count/fetchProductCount', async ({ collection }: { collection: string }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/productCount?filter=${collection}`);
    return res.data.count;
});

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async ({ collection }: { collection: string }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories?collection=${collection}`);
    return {
        categories: res.data.categories,
        availabilityData: res.data.availabilityData
    };
});

// create types
interface ProductsState {
    queryProducts: ProductResponseType;
    allProducts: ProductResponseType;
    product: ProductType | null;
    productCount: number;
    categories: CategoryType[];
    availabilityData: AvailabilityType[];
    loading: boolean;
    error: string | null | undefined;
};

// initial state for products
const initialState: ProductsState = {
    queryProducts: {
        success: false,
        products: []
    },
    allProducts: {
        success: false,
        products: []
    },
    categories: [],
    availabilityData: [],
    product: null,
    productCount: 0,
    loading: false,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // add product
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<ProductResponseType>) => {
                state.loading = false;
                state.queryProducts = action.payload;
                state.allProducts = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<ProductResponseType>) => {
                state.loading = false;
                state.queryProducts = action.payload;
                state.allProducts = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // remove product
            .addCase(removeProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProduct.fulfilled, (state, action: PayloadAction<ProductResponseType>) => {
                state.loading = false;
                state.queryProducts = action.payload;
                state.allProducts = action.payload;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductResponseType>) => {
                state.loading = false;
                state.queryProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // fetch all products
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<ProductResponseType>) => {
                state.loading = false;
                state.allProducts = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // fetch single product
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // fetch product count
            .addCase(fetchProductCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductCount.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.productCount = action.payload;
            })
            .addCase(fetchProductCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // fetch product categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ categories: CategoryType[]; availabilityData: AvailabilityType[] }>) => {
                state.loading = false;
                state.categories = action.payload.categories;
                state.availabilityData = action.payload.availabilityData;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'failed to fetch categories'
            })
    },
});

export default productsSlice.reducer;