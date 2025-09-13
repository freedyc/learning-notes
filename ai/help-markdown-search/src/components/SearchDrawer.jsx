import React from 'react';
import { Drawer, Input, List, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Search } = Input;
const { Text } = Typography;

const SearchDrawer = ({ visible, onClose, searchQuery, handleSearch, searchResults, onSearchResultClick, getContainer }) => {
  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>搜索</span>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      open={visible}
      mask={false}
      width={400}
      getContainer={getContainer}
      style={{ position: 'absolute' }}
    >
      <Search
        placeholder="在结果中搜索"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Text type="secondary">共为您找到 {searchResults.length} 个结果</Text>
      <List
        itemLayout="horizontal"
        dataSource={searchResults}
        renderItem={(item) => (
          <List.Item onClick={() => onSearchResultClick(item)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              title={
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={searchQuery.split(' ').filter(w => w)}
                  autoEscape
                  textToHighlight={item.heading === item.label ? item.label : `${item.label} > ${item.heading}`}
                />
              }
              description={
                <div>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                    {`来自: ${item.category}`}
                  </Text>
                  <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                    <Highlighter
                      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                      searchWords={searchQuery.split(' ').filter(w => w)}
                      autoEscape
                      textToHighlight={item.context || ''}
                    />
                  </Typography.Paragraph>
                </div>
              }
            />
          </List.Item>
        )}
        pagination={{
          pageSize: 10,
        }}
      />
    </Drawer>
  );
};

export default SearchDrawer;
