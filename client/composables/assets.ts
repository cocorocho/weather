export const usePublicImage = (imagePath: string) => {
  const BASE_PATH: string = "/images/"
  const img = ref<string>(`${BASE_PATH}${imagePath}`)

  return { img }
}