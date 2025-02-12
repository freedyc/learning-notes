import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '房山小青年',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>这里禁止访问</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
