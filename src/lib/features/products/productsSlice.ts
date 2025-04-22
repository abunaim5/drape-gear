import { AvailabilityType, CategoryType, ProductListType, ProductResponseType, ProductType } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk('add/addProduct', async (newProduct: ProductListType) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/addProduct`, { newProduct });
    return res.data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ currentPage, itemsPerPage, collection, sortPriceVal }: { currentPage: number, itemsPerPage: number, collection: string, sortPriceVal: string }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=${currentPage}&size=${itemsPerPage}&filter=${collection}&sort=${sortPriceVal}`);
    return res.data;
});

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/allProducts`);
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