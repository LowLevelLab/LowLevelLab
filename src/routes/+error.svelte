<script>
  import { page } from '$app/stores';
</script>

<div class="container" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;gap:1rem;">
  <h1 style="font-family:'Space Mono',monospace;color:var(--accent-cyan);font-size:4rem;margin:0;">{$page.status}</h1>
  <p style="color:var(--text-secondary);font-family:'Space Mono',monospace;">{$page.error?.message ?? 'Something went wrong.'}</p>
  <a href="/" style="color:var(--accent-cyan);font-family:'Space Mono',monospace;border:1px solid var(--accent-cyan);padding:0.5rem 1.5rem;text-decoration:none;">← Back</a>
</div>
