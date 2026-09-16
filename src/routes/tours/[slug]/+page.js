import {error} from '@sveltejs/kit';
import tours from '$lib/tours.json';
export const entries=()=>tours.map(t=>({slug:t.id}));
export function load({params}){const tour=tours.find(t=>t.id===params.slug);if(!tour)error(404,'Направление не найдено');return {tour};}
