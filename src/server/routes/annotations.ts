import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// Get annotations for an audio file
router.get('/audio/:fileId', async (req, res) => {
  const { data, error } = await supabase
    .from('annotations')
    .select('*')
    .eq('audio_file_id', req.params.fileId)
    .order('start_time', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Create annotation
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('annotations')
    .insert([{ ...req.body, user_id: req.user.id }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});

export const annotationRoutes = router;