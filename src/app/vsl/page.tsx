import BottomNav from '../_components/BottomNav';
import Header from '../_components/Header';
import Player from '../_components/Player';

export default function Vsl() {
  return (
    <div className="">
      <main className="min-h-[130vh]">
        <Header />
        <BottomNav />

        <div className="flex justify-center items-center mt-[65px] mb-[45px] px-4 md:px-0">
          <svg
            aria-hidden="true"
            className="block w-12 h-12 e-font-icon-svg text-primary transition-all duration-300 e-fas-exclamation-triangle"
            viewBox="0 0 576 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor">
            <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
          </svg>
          <h1 className='px-5 font-bold text-[19px] text-primary md:text-2xl uppercase'>Assista o vídeo até o final!</h1>
        </div>
        <Player src="/vsl.mp4" link='/pay' />
      </main>
    </div>
  );
}
