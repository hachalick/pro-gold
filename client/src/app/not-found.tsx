import Link from 'next/link'
import { BsExclamationOctagon } from 'react-icons/bs'
 
export default function NotFound() {
  return (
    <div className='w-full h-[calc(100svh_-_56px)] flex items-center justify-center flex-col'>
      <BsExclamationOctagon size={50} className="mb-3" color="#ff4a4a"/>
      <h2 className='font-semibold text-2xl mb-1 text-slate-500'>یافت نشد !!!</h2>
      <p className='text-slate-400 mb-6'>برای درخواست شما محتوایی یافت نشد.</p>
      <Link href="/" className='text-pennBlue-800 border bg-pennBlue-200/20 border-pennBlue-800 rounded-md px-3 py-2 '>بازگشت به خانه</Link>
    </div>
  )
}