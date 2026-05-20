import { z } from 'zod';

export const translateSchema = z.object({
 text:z.string().min(1),
 audience:z.enum(['manager','peer','client','report']),
 tone:z.enum(['professional','friendly','direct'])
});
