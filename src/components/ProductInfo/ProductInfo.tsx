import styles from './ProductInfo.module.scss';

interface infoProps {
  title: string;
  description: string;
  info?: {
    groupId: number;
    title: string;
    type: number;
    sortOrder: number;
    items: {
      itemId: number;
      content: string;
      sortOrder: number;
    }[];
  }[];
}

const ProductInfo = ({ title, description, info }: infoProps) => {
  console.log(info);
  return (
    <div className={styles.infoWrapper}>
      <div className={`${styles.groupWrapper} ${styles.mainGroup}`}>
        <h1 className={styles.mainTitle}>{title}</h1>
        <div className={styles.itemWrapper}>{description}</div>
      </div>
      {info?.map((group) => (
        <div key={group.groupId} className={styles.groupWrapper}>
          <h1 className={styles.title}>{group.title}</h1>
          <div className={styles.itemWrapper}>
            {group.items.map((item) => (
              <div key={item.itemId} className={styles.item}>
                <p className={styles.content}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductInfo;
