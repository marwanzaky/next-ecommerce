import Image from 'next/image';

function Img({ class_name, src, alt }) {
    return <div className={`${class_name}`}>
        <Image src={src} alt={alt} layout='responsive' width='100px' height='100px' />
    </div>
}

export default Img;