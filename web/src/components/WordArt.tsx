import type { ArtId } from '../data/course'

export function SpeakerIcon() {
  return <svg width="27" height="27" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M4 12h6l8-6v20l-8-6H4z" fill="#168DC0" stroke="#168DC0" strokeWidth="2" strokeLinejoin="round" />
    <path d="M22 11c3 2 3 8 0 10M25 7c6 4 6 14 0 18" fill="none" stroke="#168DC0" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
}

export function WordArt({ art, size = 72 }: { art: ArtId; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 96 96" aria-hidden="true">
    {art === 'wave' && <>
      <path d="M24 75c-9-8-13-17-13-27 0-5 5-8 9-5l9 8V22c0-7 10-7 10 0v21-29c0-7 10-7 10 0v27-23c0-7 10-7 10 0v25-17c0-7 10-7 10 0v25c0-4 4-7 8-5 5 3 6 9 3 16L70 82H39Z" fill="#F7BA8F" stroke="#A75C3B" strokeWidth="3" strokeLinejoin="round" />
      <path d="M31 76h39v12H31z" fill="#E8714B" />
      <path d="M15 22l-5-7M24 15l-2-9M76 13l7-7" stroke="#F5B52D" strokeWidth="4" strokeLinecap="round" />
    </>}
    {art === 'sun' && <>
      <circle cx="48" cy="48" r="25" fill="#FFC547" stroke="#E9A83A" strokeWidth="3" />
      <path d="M48 6v10M48 80v10M6 48h10M80 48h10M18 18l7 7M71 71l7 7M18 78l7-7M71 25l7-7" stroke="#F29E38" strokeWidth="6" strokeLinecap="round" />
      <path d="M38 51c5 6 15 6 20 0" fill="none" stroke="#B76A25" strokeWidth="3" strokeLinecap="round" />
    </>}
    {art === 'day' && <>
      <circle cx="65" cy="34" r="19" fill="#FFC547" />
      <path d="M21 71c-9 0-14-6-14-14 0-8 6-14 14-14 3-13 15-22 28-19 11 2 18 10 20 20 11 0 19 7 19 17 0 9-8 16-18 16H21Z" fill="#F7FBF7" stroke="#8CB1B6" strokeWidth="3" />
      <path d="M24 57h40" stroke="#C8E1E3" strokeWidth="4" strokeLinecap="round" />
    </>}
    {art === 'tag' && <>
      <path d="M14 20h46l22 27-22 29H14a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6Z" fill="#EBCBA5" stroke="#AA774E" strokeWidth="3" />
      <circle cx="66" cy="48" r="6" fill="#FFFCF8" stroke="#AA774E" strokeWidth="2" />
      <path d="M23 40h25M23 54h18" stroke="#AA774E" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 48h15" stroke="#AA774E" strokeWidth="3" strokeLinecap="round" />
    </>}
    {art === 'person' && <>
      <ellipse cx="48" cy="83" rx="35" ry="9" fill="#D7E4E7" />
      <path d="M18 75c0-15 13-24 30-24s30 9 30 24v9H18Z" fill="#66BEDD" stroke="#2689AF" strokeWidth="3" />
      <circle cx="48" cy="33" r="22" fill="#F7BA8F" stroke="#A75C3B" strokeWidth="3" />
      <path d="M28 27c1-16 10-23 22-23 11 0 19 7 20 21-9-1-15-6-19-11-5 7-12 11-23 13Z" fill="#8A5439" />
      <circle cx="40" cy="35" r="2" fill="#423329" /><circle cx="56" cy="35" r="2" fill="#423329" />
      <path d="M42 44c4 4 9 4 13 0" fill="none" stroke="#A75C3B" strokeWidth="2.5" strokeLinecap="round" />
    </>}
    {art === 'speech' && <>
      <path d="M12 17h72a6 6 0 0 1 6 6v43a6 6 0 0 1-6 6H39L20 88V72h-8a6 6 0 0 1-6-6V23a6 6 0 0 1 6-6Z" fill="#67C4DF" stroke="#2689AF" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 38h47M24 51h37" stroke="#F7FCFA" strokeWidth="5" strokeLinecap="round" />
    </>}
  </svg>
}
