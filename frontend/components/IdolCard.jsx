import Link from "next/link";
import Image from "next/image";

export default function IdolCard({ idol, showDetails = true, compact = false }) {
    return (
        <article className={`idolCard ${compact ? 'compact' : ''}`}>
            <Image src={idol.image_url || '/images/no-product-image-400x400-1.png'} alt={idol.stage_name || 'Stage Name'} width={300} height={400} unoptimized referrerPolicy="no-referrer"/>
            <div className="idolCardContent">
                <span className="groupBadge">
                    {idol.group_name}
                </span>
                <h2>{idol.stage_name}</h2>
                {idol.real_name && (
                    <p className="muted">{idol.real_name}</p>
                )}
                {idol.position && <p>{idol.position}</p>}
                {showDetails && (
                    <Link href={`/idols/${idol.id}`} className="button">
                        View Profile
                    </Link>
                )}
            </div>
        </article>
    );
}