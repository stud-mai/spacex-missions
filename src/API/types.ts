export interface History {
	id: number,
	title: string,
	event_date_utc: string,
	event_date_unix: number,
	flight_number: number | null,
	details: string,
	links: {
		reddit: string | null,
		article: string | null,
		wikipedia: string | null
	}
}

interface RocketPayload {
	nationality: string,
	manufacturer: string | null,
	payload_type: string,
	payload_mass_kg: number | null
}

interface Rocket {
	rocket_id: string,
	second_stage: {
		payloads: RocketPayload[]
	}
}

export interface Launch {
	flight_number: number,
	mission_name: string,
	launch_date_utc: string,
	rocket: Rocket
}

interface PayloadWeight {
	id: string,
	name: string,
	kg: number,
	lb: number
}

export interface RocketOrbits {
	payload_weights: PayloadWeight[],
	rocket_id: string
}

export interface LaunchInfo {
	mission_name: string,
	rocket: {
		rocket_name: string
	},
	launch_site: {
		site_name_long: string
	},
	launch_success: boolean,
	details: string,
	links: {
		video_link?: string,
		youtube_id?: string
	}
}