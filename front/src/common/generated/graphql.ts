import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  LocalTime: any;
  Time: any;
};

export type CreateIngredientInput = {
  mesureUnits: Array<MesureUnit>;
  name: Scalars['String'];
  previewPicture: Scalars['String'];
};

export type CreateRecipeIngredientInput = {
  id: Scalars['ID'];
  mesureUnit: MesureUnit;
  quantity: Scalars['Int'];
};

export type CreateRecipeInput = {
  cookingTime: Scalars['Time'];
  difficulty: Difficulty;
  ingredients: Array<CreateRecipeIngredientInput>;
  portion: Scalars['Int'];
  previewPicture: Scalars['String'];
  steps: Array<Scalars['String']>;
  tagIds: Array<Scalars['String']>;
  title: Scalars['String'];
  tutorialVideo: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export enum Difficulty {
  Easy = 'easy',
  Hard = 'hard',
  Medium = 'medium'
}

export type FilterInput = {
  difficulties?: InputMaybe<Array<Difficulty>>;
  ingredientNames?: InputMaybe<Array<Scalars['String']>>;
  isFromConnectedUser?: InputMaybe<Scalars['Boolean']>;
  maximumCookingTime?: InputMaybe<Scalars['LocalTime']>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
  tagNames?: InputMaybe<Array<Scalars['String']>>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['ID'];
  mesureUnits: Array<MesureUnit>;
  name: Scalars['String'];
  previewPicture: Scalars['String'];
};

export type IngredientOutput = {
  __typename?: 'IngredientOutput';
  ingredientId: Scalars['ID'];
  mesureUnit: MesureUnit;
  name: Scalars['String'];
  possibleMesureUnits: Array<MesureUnit>;
  previewPicture: Scalars['String'];
  quantity: Scalars['Int'];
  recipeIngredientId: Scalars['ID'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum MesureUnit {
  Centiliters = 'Centiliters',
  Gram = 'Gram',
  Kilogram = 'Kilogram',
  Liter = 'Liter',
  Milliliter = 'Milliliter',
  Pinch = 'Pinch',
  Sachet = 'Sachet',
  Tablespoon = 'Tablespoon',
  Teaspoon = 'Teaspoon',
  Unity = 'Unity'
}

export type Mutation = {
  __typename?: 'Mutation';
  banUser: User;
  confirmEmail: LoginResponse;
  createIngredient: Ingredient;
  createRecipe: RecipeOutput;
  deleteRecipe: Recipe;
  login: LoginResponse;
  refreshTokens: LoginResponse;
  register: User;
  removeIngredient: Ingredient;
  removeTag: Tag;
  resetPassword: LoginResponse;
  sendRegisterConfirmation: User;
  sendResetPasswordCode: Scalars['String'];
  updateAccount: User;
  updateIngredient: Ingredient;
};


export type MutationBanUserArgs = {
  id: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  email: Scalars['String'];
  emailCode: Scalars['Int'];
};


export type MutationCreateIngredientArgs = {
  input: CreateIngredientInput;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveIngredientArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  emailCode: Scalars['Float'];
  newPassword: Scalars['String'];
};


export type MutationSendRegisterConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationSendResetPasswordCodeArgs = {
  email: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateIngredientArgs = {
  id: Scalars['String'];
  input: UpdateIngredientInput;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginationInput = {
  itemsPerPage: Scalars['Int'];
  page: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  account: User;
  ingredients: Array<Ingredient>;
  recipe: RecipeOutput;
  recipes: Array<RecipeOutput>;
  tags: Array<Tag>;
  user: User;
  users: Array<User>;
};


export type QueryRecipeArgs = {
  id: Scalars['String'];
};


export type QueryRecipesArgs = {
  options: RecipeSearchInput;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  cookingTime: Scalars['LocalTime'];
  creationDate: Scalars['DateTime'];
  creator: User;
  difficulty: Difficulty;
  id: Scalars['ID'];
  portion: Scalars['Int'];
  previewPicture: Scalars['String'];
  steps: Array<Scalars['String']>;
  title: Scalars['String'];
  tutorialVideo: Scalars['String'];
};

export type RecipeOrderInput = {
  direction: OrderDirection;
  name: RecipeOrderName;
};

export enum RecipeOrderName {
  CreationDate = 'creationDate'
}

export type RecipeOutput = {
  __typename?: 'RecipeOutput';
  cookingTime: Scalars['LocalTime'];
  creationDate: Scalars['DateTime'];
  creator: User;
  difficulty: Difficulty;
  id: Scalars['ID'];
  ingredients: Array<IngredientOutput>;
  portion: Scalars['Int'];
  previewPicture: Scalars['String'];
  steps: Array<Scalars['String']>;
  tags: Array<TagOutput>;
  title: Scalars['String'];
  tutorialVideo: Scalars['String'];
};

export type RecipeSearchInput = {
  filterBy?: InputMaybe<FilterInput>;
  orderBy?: InputMaybe<RecipeOrderInput>;
};

export type RecipeTag = {
  __typename?: 'RecipeTag';
  id: Scalars['ID'];
  recipe: Recipe;
  tag: Tag;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  recipeTags: Array<RecipeTag>;
};

export type TagOutput = {
  __typename?: 'TagOutput';
  name: Scalars['String'];
  recipeTagId: Scalars['ID'];
  tagId: Scalars['ID'];
};

export type UpdateIngredientInput = {
  mesureUnits?: InputMaybe<Array<MesureUnit>>;
  name?: InputMaybe<Scalars['String']>;
  previewPicture?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  recipes: Array<Recipe>;
  role: UserRoles;
  status: UserStatus;
};

export enum UserRoles {
  Admin = 'admin',
  User = 'user'
}

export enum UserStatus {
  IsActive = 'isActive',
  IsBanned = 'isBanned',
  IsPending = 'isPending'
}

export type RecipeFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeFiltersQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string }>, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }> };

export type RecipesWithFiltersQueryVariables = Exact<{
  options: RecipeSearchInput;
}>;


export type RecipesWithFiltersQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'RecipeOutput', id: string, title: string, creationDate: any }> };


export const RecipeFiltersDocument = gql`
    query RecipeFilters {
  tags {
    id
    name
  }
  ingredients {
    id
    name
  }
}
    `;

/**
 * __useRecipeFiltersQuery__
 *
 * To run a query within a Vue component, call `useRecipeFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeFiltersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRecipeFiltersQuery();
 */
export function useRecipeFiltersQuery(options: VueApolloComposable.UseQueryOptions<RecipeFiltersQuery, RecipeFiltersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecipeFiltersQuery, RecipeFiltersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecipeFiltersQuery, RecipeFiltersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RecipeFiltersQuery, RecipeFiltersQueryVariables>(RecipeFiltersDocument, {}, options);
}
export function useRecipeFiltersLazyQuery(options: VueApolloComposable.UseQueryOptions<RecipeFiltersQuery, RecipeFiltersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecipeFiltersQuery, RecipeFiltersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecipeFiltersQuery, RecipeFiltersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RecipeFiltersQuery, RecipeFiltersQueryVariables>(RecipeFiltersDocument, {}, options);
}
export type RecipeFiltersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RecipeFiltersQuery, RecipeFiltersQueryVariables>;
export const RecipesWithFiltersDocument = gql`
    query RecipesWithFilters($options: RecipeSearchInput!) {
  recipes(options: $options) {
    id
    title
    creationDate
  }
}
    `;

/**
 * __useRecipesWithFiltersQuery__
 *
 * To run a query within a Vue component, call `useRecipesWithFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesWithFiltersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRecipesWithFiltersQuery({
 *   options: // value for 'options'
 * });
 */
export function useRecipesWithFiltersQuery(variables: RecipesWithFiltersQueryVariables | VueCompositionApi.Ref<RecipesWithFiltersQueryVariables> | ReactiveFunction<RecipesWithFiltersQueryVariables>, options: VueApolloComposable.UseQueryOptions<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>(RecipesWithFiltersDocument, variables, options);
}
export function useRecipesWithFiltersLazyQuery(variables: RecipesWithFiltersQueryVariables | VueCompositionApi.Ref<RecipesWithFiltersQueryVariables> | ReactiveFunction<RecipesWithFiltersQueryVariables>, options: VueApolloComposable.UseQueryOptions<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>(RecipesWithFiltersDocument, variables, options);
}
export type RecipesWithFiltersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RecipesWithFiltersQuery, RecipesWithFiltersQueryVariables>;