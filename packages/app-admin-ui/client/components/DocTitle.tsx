import { useEffect } from 'react';
import { useAdminMeta } from '../providers/AdminMeta';

type Props = {
  title: string;
};

const DocTitle = ({ title }: Prosp) => {
  const { name } = useAdminMeta();

  useEffect(() => {
    document.title = `${title} — ${name}`;
  }, [title]);

  return null;
}

export default DocTitle;
