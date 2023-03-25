import type { FetchResult } from '@apollo/client'

export type GraphqlResult = FetchResult<
	any,
	Record<string, any>,
	Record<string, any>
>
