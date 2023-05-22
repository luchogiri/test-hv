import { House as HouseType } from '../services/houses';
import styles from './House.module.css';
import { LocationIcon, PriceIcon, UserIcon } from '../assets';

type Props = Partial<HouseType> & {
  loading?: boolean;
}

export default function House(props: Props) {
  return (
    <article className={`${styles.house} ${props.loading ? styles.loading : ''}`} role={props.loading ? 'progressbar' : 'article'}>
      <figure>
        <img src={props.photoURL} alt={props.address} />
      </figure>
      <div>
        <h1>
          <img src={LocationIcon} alt="Home Location" />
          {props.address}
        </h1>
        <h2>
          <img src={UserIcon} alt="Home Owner" />
          {props.homeowner}
        </h2>
        <h3>
          <img src={PriceIcon} alt="Home Price" />
          {!!props.price && '$ '}{props.price?.toLocaleString()}
        </h3>
      </div>
    </article>
  )
}