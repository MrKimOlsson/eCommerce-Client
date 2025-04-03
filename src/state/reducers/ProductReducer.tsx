import { IProduct } from '../../models/products/IProduct';
import { 
    FETCH_PRODUCTS_REQUEST, 
    FETCH_PRODUCTS_SUCCESS, 
    FETCH_PRODUCTS_FAILURE 
} from '../actions/ProductActions';

interface ProductState {
    products: IProduct[];
    error: string | null;
    loading: boolean;
}

// Define the actions type
type ProductAction =
    | { type: typeof FETCH_PRODUCTS_REQUEST }
    | { type: typeof FETCH_PRODUCTS_SUCCESS; payload: IProduct[] }
    | { type: typeof FETCH_PRODUCTS_FAILURE; payload: string };

const initialState: ProductState = {
    products: [],
    error: null,
    loading: false,
};

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};