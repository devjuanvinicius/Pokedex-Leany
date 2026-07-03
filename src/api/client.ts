const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchFromPokeApi<TResponse>(
  pathOrUrl: string,
): Promise<TResponse> {
  const requestUrl = pathOrUrl.startsWith('http')
    ? pathOrUrl
    : `${POKEAPI_BASE_URL}${pathOrUrl}`

  const response = await fetch(requestUrl)

  if (!response.ok) {
    throw new Error(
      `Falha ao buscar ${requestUrl}: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<TResponse>
}
