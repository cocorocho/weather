type Coordinates = {
    x: number
    y: number
}

type City = {
    name: string
    countryName: string
    coordinates: Coordinates
}

type WeatherDescription = {
    description: string
    image: string
    layout?: string
}
