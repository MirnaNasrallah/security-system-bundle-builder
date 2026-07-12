import { memo } from 'react'

function CameraIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M8.666 24.917v-4.334M17.334 24.917v-4.334M22.75 24.917H3.25" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5.146a4.063 4.063 0 1 1 0 8.125 4.063 4.063 0 0 1 0-8.125Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.973 16.25a.406.406 0 1 0 0 .813.406.406 0 0 0 0-.813Z" fill="#6F7882" stroke="#6F7882" strokeWidth="1.5" />
      <rect x="3.188" y=".75" width="19.625" height="19.625" rx="3.25" stroke="#6F7882" strokeWidth="1.5" />
    </svg>
  )
}

function PlanIcon() {
  return (
    <svg width="19" height="24" viewBox="0 0 19 24" fill="none" aria-hidden="true">
      <path d="m1.39 2.937.068-.017L8.837.595a2.06 2.06 0 0 1 1.239 0l7.378 2.325.068.017c.293.055.89.28.89.822v8.365c0 3.9-5.586 8.85-8.538 10.443a.75.75 0 0 1-.834 0C6.087 20.974.5 16.024.5 12.124V3.759c0-.542.597-.767.89-.822Z" stroke="#6F7882" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SensorsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M19.553 7.13c0 .694-.463 1.156-1.156 1.156H9.153c-.694 0-1.156-.462-1.156-1.155v-5.2c0-.694.462-1.156 1.156-1.156h9.244c.693 0 1.156.462 1.156 1.155v5.2ZM11.81 4.242v.577M15.855 4.242v.577M19.163 13.544c-2.928 2.889-7.847 2.889-10.775 0M22.91 17.242c-5.036 4.969-13.234 4.969-18.27 0M26.775 21.633c-7.261 6.933-18.739 6.818-26-.116" stroke="#6F7882" strokeWidth="1.55" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProtectionIcon() {
  const cells = [
    'M8.072 10.174c0 .84-.681 1.522-1.522 1.522H5.536a1.522 1.522 0 1 1 0-3.044H6.55c.84 0 1.522.681 1.522 1.522Z',
    'M15.029 10.174c0 .84-.682 1.522-1.522 1.522h-1.014a1.522 1.522 0 1 1 0-3.044h1.014c.84 0 1.522.681 1.522 1.522Z',
    'M21.985 10.174c0 .84-.681 1.522-1.522 1.522H19.45a1.522 1.522 0 1 1 0-3.044h1.014c.84 0 1.522.681 1.522 1.522Z',
    'M8.072 15.826c0 .84-.681 1.522-1.522 1.522H5.536a1.522 1.522 0 1 1 0-3.044H6.55c.84 0 1.522.681 1.522 1.522Z',
    'M15.029 15.826c0 .84-.682 1.522-1.522 1.522h-1.014a1.522 1.522 0 1 1 0-3.044h1.014c.84 0 1.522.681 1.522 1.522Z',
    'M21.985 15.826c0 .84-.681 1.522-1.522 1.522H19.45a1.522 1.522 0 1 1 0-3.044h1.014c.84 0 1.522.681 1.522 1.522Z',
    'M8.072 21.478c0 .84-.681 1.522-1.522 1.522H5.536a1.522 1.522 0 1 1 0-3.043H6.55c.84 0 1.522.681 1.522 1.521Z',
    'M15.029 21.478c0 .84-.682 1.522-1.522 1.522h-1.014a1.522 1.522 0 1 1 0-3.043h1.014c.84 0 1.522.681 1.522 1.521Z',
    'M21.985 21.478c0 .84-.681 1.522-1.522 1.522H19.45a1.522 1.522 0 1 1 0-3.043h1.014c.84 0 1.522.681 1.522 1.521Z',
  ]

  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M16.478 6.478 13 3 9.522 6.478" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {cells.map((path) => (
        <path key={path} d={path} stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )
}

const icons = {
  camera: CameraIcon,
  shield: PlanIcon,
  sensor: SensorsIcon,
  protection: ProtectionIcon,
}

function StepIcon({ name }) {
  const Icon = icons[name]
  return Icon ? <Icon /> : null
}

export default memo(StepIcon)
