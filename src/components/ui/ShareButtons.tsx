'use client';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  async function handleWebShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    }
  }

  function openWindow(shareUrl: string) {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  }

  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => openWindow(twitter)}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-primary hover:bg-primary-dark text-white text-xs font-medium"
          aria-label="Share on Twitter"
        >
          Twitter
        </button>
        <button
          onClick={() => openWindow(facebook)}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-primary hover:bg-primary-dark text-white text-xs font-medium"
          aria-label="Share on Facebook"
        >
          Facebook
        </button>
        <button
          onClick={() => openWindow(linkedin)}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-primary hover:bg-primary-dark text-white text-xs font-medium"
          aria-label="Share on LinkedIn"
        >
          LinkedIn
        </button>
        <button
          onClick={handleWebShare}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary-dark text-gray-900 text-xs font-medium"
        >
          Share...
        </button>
      </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        className="w-full inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs"
      >
        Copy link
      </button>
    </div>
  );
}

