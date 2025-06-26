import styles from './ProductInfo.module.scss';

interface infoProps {
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

const ProductInfo = ({ info }: infoProps) => {
  console.log(info);
  return (
    <div className={styles.infoWrapper}>
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
