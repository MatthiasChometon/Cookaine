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
  cookingTime: Scalars['LocalTime'];
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
  ingredient: Ingredient;
  ingredients: Array<Ingredient>;
  recipe: RecipeOutput;
  recipes: Array<RecipeOutput>;
  tags: Array<Tag>;
  user: User;
  users: Array<User>;
};


export type QueryIngredientArgs = {
  id: Scalars['String'];
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
  User = 'user',
  Visitor = 'visitor'
}

export enum UserStatus {
  IsActive = 'isActive',
  IsBanned = 'isBanned',
  IsPending = 'isPending'
}

export type HomeRecipesQueryVariables = Exact<{
  options: RecipeSearchInput;
}>;


export type HomeRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'RecipeOutput', id: string, title: string, difficulty: Difficulty, previewPicture: string, cookingTime: any }> };

export type IngredientQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IngredientQuery = { __typename?: 'Query', ingredient: { __typename?: 'Ingredient', id: string, name: string, previewPicture: string, mesureUnits: Array<MesureUnit> } };

export type UpdateIngredientMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateIngredientInput;
}>;


export type UpdateIngredientMutation = { __typename?: 'Mutation', updateIngredient: { __typename?: 'Ingredient', id: string } };

export type IngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type IngredientsQuery = { __typename?: 'Query', ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }> };

export type RemoveIngredientMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveIngredientMutation = { __typename?: 'Mutation', removeIngredient: { __typename?: 'Ingredient', id: string } };

export type CreateIngredientMutationVariables = Exact<{
  input: CreateIngredientInput;
}>;


export type CreateIngredientMutation = { __typename?: 'Mutation', createIngredient: { __typename?: 'Ingredient', id: string, name: string } };

export type AdminRecipeFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminRecipeFiltersQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string }>, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }>, users: Array<{ __typename?: 'User', id: string, email: string }> };

export type RecipeFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeFiltersQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string }>, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string }> };

export type RecipesWithFiltersQueryVariables = Exact<{
  options: RecipeSearchInput;
}>;


export type RecipesWithFiltersQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'RecipeOutput', id: string, title: string, creationDate: any, previewPicture: string, difficulty: Difficulty, cookingTime: any }> };

export type CreateRecipeMutationVariables = Exact<{
  input: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'RecipeOutput', id: string, title: string, creationDate: any, ingredients: Array<{ __typename?: 'IngredientOutput', ingredientId: string, name: string, mesureUnit: MesureUnit }>, tags: Array<{ __typename?: 'TagOutput', name: string }> } };

export type RecipeAndIngredientsQueryVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type RecipeAndIngredientsQuery = { __typename?: 'Query', recipe: { __typename?: 'RecipeOutput', id: string, title: string, tutorialVideo: string, previewPicture: string, difficulty: Difficulty, portion: number, steps: Array<string>, cookingTime: any, ingredients: Array<{ __typename?: 'IngredientOutput', name: string, quantity: number, mesureUnit: MesureUnit, previewPicture: string }>, tags: Array<{ __typename?: 'TagOutput', name: string }> } };


export const HomeRecipesDocument = gql`
    query HomeRecipes($options: RecipeSearchInput!) {
  recipes(options: $options) {
    id
    title
    difficulty
    previewPicture
    cookingTime
  }
}
    `;

/**
 * __useHomeRecipesQuery__
 *
 * To run a query within a Vue component, call `useHomeRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeRecipesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useHomeRecipesQuery({
 *   options: // value for 'options'
 * });
 */
export function useHomeRecipesQuery(variables: HomeRecipesQueryVariables | VueCompositionApi.Ref<HomeRecipesQueryVariables> | ReactiveFunction<HomeRecipesQueryVariables>, options: VueApolloComposable.UseQueryOptions<HomeRecipesQuery, HomeRecipesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<HomeRecipesQuery, HomeRecipesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<HomeRecipesQuery, HomeRecipesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<HomeRecipesQuery, HomeRecipesQueryVariables>(HomeRecipesDocument, variables, options);
}
export function useHomeRecipesLazyQuery(variables: HomeRecipesQueryVariables | VueCompositionApi.Ref<HomeRecipesQueryVariables> | ReactiveFunction<HomeRecipesQueryVariables>, options: VueApolloComposable.UseQueryOptions<HomeRecipesQuery, HomeRecipesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<HomeRecipesQuery, HomeRecipesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<HomeRecipesQuery, HomeRecipesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<HomeRecipesQuery, HomeRecipesQueryVariables>(HomeRecipesDocument, variables, options);
}
export type HomeRecipesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<HomeRecipesQuery, HomeRecipesQueryVariables>;
export const IngredientDocument = gql`
    query Ingredient($id: String!) {
  ingredient(id: $id) {
    id
    name
    previewPicture
    mesureUnits
  }
}
    `;

/**
 * __useIngredientQuery__
 *
 * To run a query within a Vue component, call `useIngredientQuery` and pass it any options that fit your needs.
 * When your component renders, `useIngredientQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useIngredientQuery({
 *   id: // value for 'id'
 * });
 */
export function useIngredientQuery(variables: IngredientQueryVariables | VueCompositionApi.Ref<IngredientQueryVariables> | ReactiveFunction<IngredientQueryVariables>, options: VueApolloComposable.UseQueryOptions<IngredientQuery, IngredientQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IngredientQuery, IngredientQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IngredientQuery, IngredientQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IngredientQuery, IngredientQueryVariables>(IngredientDocument, variables, options);
}
export function useIngredientLazyQuery(variables: IngredientQueryVariables | VueCompositionApi.Ref<IngredientQueryVariables> | ReactiveFunction<IngredientQueryVariables>, options: VueApolloComposable.UseQueryOptions<IngredientQuery, IngredientQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IngredientQuery, IngredientQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IngredientQuery, IngredientQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IngredientQuery, IngredientQueryVariables>(IngredientDocument, variables, options);
}
export type IngredientQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IngredientQuery, IngredientQueryVariables>;
export const UpdateIngredientDocument = gql`
    mutation UpdateIngredient($id: String!, $input: UpdateIngredientInput!) {
  updateIngredient(id: $id, input: $input) {
    id
  }
}
    `;

/**
 * __useUpdateIngredientMutation__
 *
 * To run a mutation, you first call `useUpdateIngredientMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIngredientMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateIngredientMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIngredientMutation(options: VueApolloComposable.UseMutationOptions<UpdateIngredientMutation, UpdateIngredientMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateIngredientMutation, UpdateIngredientMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateIngredientMutation, UpdateIngredientMutationVariables>(UpdateIngredientDocument, options);
}
export type UpdateIngredientMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateIngredientMutation, UpdateIngredientMutationVariables>;
export const IngredientsDocument = gql`
    query Ingredients {
  ingredients {
    id
    name
  }
}
    `;

/**
 * __useIngredientsQuery__
 *
 * To run a query within a Vue component, call `useIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIngredientsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useIngredientsQuery();
 */
export function useIngredientsQuery(options: VueApolloComposable.UseQueryOptions<IngredientsQuery, IngredientsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IngredientsQuery, IngredientsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IngredientsQuery, IngredientsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, {}, options);
}
export function useIngredientsLazyQuery(options: VueApolloComposable.UseQueryOptions<IngredientsQuery, IngredientsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<IngredientsQuery, IngredientsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<IngredientsQuery, IngredientsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<IngredientsQuery, IngredientsQueryVariables>(IngredientsDocument, {}, options);
}
export type IngredientsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<IngredientsQuery, IngredientsQueryVariables>;
export const RemoveIngredientDocument = gql`
    mutation RemoveIngredient($id: String!) {
  removeIngredient(id: $id) {
    id
  }
}
    `;

/**
 * __useRemoveIngredientMutation__
 *
 * To run a mutation, you first call `useRemoveIngredientMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveIngredientMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveIngredientMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemoveIngredientMutation(options: VueApolloComposable.UseMutationOptions<RemoveIngredientMutation, RemoveIngredientMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveIngredientMutation, RemoveIngredientMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RemoveIngredientMutation, RemoveIngredientMutationVariables>(RemoveIngredientDocument, options);
}
export type RemoveIngredientMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveIngredientMutation, RemoveIngredientMutationVariables>;
export const CreateIngredientDocument = gql`
    mutation CreateIngredient($input: CreateIngredientInput!) {
  createIngredient(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useCreateIngredientMutation__
 *
 * To run a mutation, you first call `useCreateIngredientMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateIngredientMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateIngredientMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateIngredientMutation(options: VueApolloComposable.UseMutationOptions<CreateIngredientMutation, CreateIngredientMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateIngredientMutation, CreateIngredientMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateIngredientMutation, CreateIngredientMutationVariables>(CreateIngredientDocument, options);
}
export type CreateIngredientMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateIngredientMutation, CreateIngredientMutationVariables>;
export const AdminRecipeFiltersDocument = gql`
    query AdminRecipeFilters {
  tags {
    id
    name
  }
  ingredients {
    id
    name
  }
  users {
    id
    email
  }
}
    `;

/**
 * __useAdminRecipeFiltersQuery__
 *
 * To run a query within a Vue component, call `useAdminRecipeFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminRecipeFiltersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAdminRecipeFiltersQuery();
 */
export function useAdminRecipeFiltersQuery(options: VueApolloComposable.UseQueryOptions<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>(AdminRecipeFiltersDocument, {}, options);
}
export function useAdminRecipeFiltersLazyQuery(options: VueApolloComposable.UseQueryOptions<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>(AdminRecipeFiltersDocument, {}, options);
}
export type AdminRecipeFiltersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AdminRecipeFiltersQuery, AdminRecipeFiltersQueryVariables>;
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
    previewPicture
    difficulty
    cookingTime
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
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($input: CreateRecipeInput!) {
  createRecipe(input: $input) {
    id
    title
    creationDate
    ingredients {
      ingredientId
      name
      mesureUnit
    }
    tags {
      name
    }
  }
}
    `;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateRecipeMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateRecipeMutation(options: VueApolloComposable.UseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, options);
}
export type CreateRecipeMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const RecipeAndIngredientsDocument = gql`
    query RecipeAndIngredients($recipeId: String!) {
  recipe(id: $recipeId) {
    id
    title
    tutorialVideo
    previewPicture
    difficulty
    portion
    steps
    cookingTime
    ingredients {
      name
      quantity
      mesureUnit
      previewPicture
    }
    tags {
      name
    }
  }
}
    `;

/**
 * __useRecipeAndIngredientsQuery__
 *
 * To run a query within a Vue component, call `useRecipeAndIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeAndIngredientsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRecipeAndIngredientsQuery({
 *   recipeId: // value for 'recipeId'
 * });
 */
export function useRecipeAndIngredientsQuery(variables: RecipeAndIngredientsQueryVariables | VueCompositionApi.Ref<RecipeAndIngredientsQueryVariables> | ReactiveFunction<RecipeAndIngredientsQueryVariables>, options: VueApolloComposable.UseQueryOptions<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>(RecipeAndIngredientsDocument, variables, options);
}
export function useRecipeAndIngredientsLazyQuery(variables: RecipeAndIngredientsQueryVariables | VueCompositionApi.Ref<RecipeAndIngredientsQueryVariables> | ReactiveFunction<RecipeAndIngredientsQueryVariables>, options: VueApolloComposable.UseQueryOptions<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>(RecipeAndIngredientsDocument, variables, options);
}
export type RecipeAndIngredientsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RecipeAndIngredientsQuery, RecipeAndIngredientsQueryVariables>;