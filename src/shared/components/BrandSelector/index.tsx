// Dependencies
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

// Components
import SearchInput from './partials/SearchInput';
import BrandItem from './partials/BrandItem';
import Button from '@components/Button';

// StyleSheet
import styles from './BrandSelector.module.scss';

// Assets
import SaveIcon from '@assets/icons/save.svg?react';

interface BrandSelectorProps {
  readonly onSelect: (id: number) => void;
}

export default function BrandSelector({onSelect}: BrandSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <SearchInput />
      </div>
      <div className={styles.scroll}>
        <ul className={styles.list}>
          {Array.from({length: 40}).map((_, index) => (
            <li key={`--brand-item-${index.toString()}`}>
              <BrandItem
                photoUrl={'https://s3-alpha-sig.figma.com/img/c276/d463/b033780d6312b01cdc19f7ba027435fd?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EEJibvifdwlun2uB0yAwqw5Hvv-yZfsiaOiM5SeIEXCOdv~kVvmKhLWH8x-3RetEENhE-F0uAhIefQE6nwVidpEEvzmyFVAuhNIVoI0Pcg7FQWvPFU3b01UTi-u6~u4A5~IokBg5hR4D4mh7Fof228LVOMZmD46a6PyvR5r2uY~4VpRqpkUZIGs2NOo38~3LACzTbDpar2dCvmjjV0SuvwhHl2~T5C6EfH3FQUUOnXJn-LuTnjCCninz~ZWQLpgriMoLEWlJJip59h~LL3kctIBX2AMkzyVFMBBYdNDymoRiCVeG7sDfr07k~4uw1hdnt6BLYAiPR7NjDBZA~4qkTw__'}
                name={'Zora'}
                orientation={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}
                selected={selected === index}
                onSelect={() => setSelected(selected === index ? null : index)}
              />
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div 
            className={styles.footer}
            initial={{y: 300}}
            animate={{y: 0}}
            exit={{y: 300}}
            transition={{type: 'spring', stiffness: 300, damping: 20}}
          >
            <Button 
              iconLeft={(<SaveIcon />)} 
              caption={'Save'} 
              onClick={() => onSelect(selected)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}