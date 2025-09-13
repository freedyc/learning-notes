import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Menu, Drawer, List, Typography, Affix } from 'antd';
import ReactMarkdown from 'react-markdown';
import { menuItems } from '../data/docs';
import gfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import Mark from 'mark.js';
import Highlighter from 'react-highlight-words';
import { toSlug } from '../utils';

const { Sider, Content } = Layout;
const { Search } = Input;

const HelpCenter = () => {
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleContent, setArticleContent] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [drawerSearchValue, setDrawerSearchValue] = useState('');
  const [highlightTerm, setHighlightTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [articlesData, setArticlesData] = useState([]);
  const [scrollToContext, setScrollToContext] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = [];

      const processChildren = async (children) => {
        for (const item of children) {
          if (item.children) {
            await processChildren(item.children);
          } else {
            try {
              const response = await fetch(item.filePath);
              if (!response.ok) {
                console.error(`Failed to fetch ${item.filePath}`);
                continue;
              }
              const text = await response.text();
              allArticles.push({ ...item, content: text });
            } catch (error) {
              console.error('Error fetching article:', error);
            }
          }
        }
      };

      await processChildren(menuItems);
      setArticlesData(allArticles);
      if (allArticles.length > 0) {
        setSelectedKey(allArticles[0].key);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (articlesData.length > 0) {
      const article = articlesData.find(item => item.key === selectedKey);
      setSelectedArticle(article);
    }
  }, [selectedKey, articlesData]);

  useEffect(() => {
    if (selectedArticle) {
      setArticleContent(selectedArticle.content);
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (contentRef.current) {
      const instance = new Mark(contentRef.current);
      instance.unmark({
        done: () => {
          if (highlightTerm) {
            instance.mark(highlightTerm, {
              done: () => {
                if (scrollToContext) {
                  const allElements = Array.from(
                    contentRef.current.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, td, pre, blockquote')
                  );
                  const targetElement = allElements.find(
                    (el) => el.textContent.trim() === scrollToContext.trim()
                  );
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    });
                  }
                  setScrollToContext(null); // Reset after attempting to scroll
                }
              },
            });
          }
        },
      });
    }
  }, [articleContent, highlightTerm, scrollToContext]);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    setSearchValue('');
    setDrawerVisible(false);
    setSearchResults([]);
    setDrawerSearchValue('');
    setHighlightTerm('');
  };

  const performSearch = (value) => {
    setHighlightTerm(value);
    if (!value) {
      setSearchResults([]);
      return [];
    }
    const lowerCaseValue = value.toLowerCase();
    const results = [];
    articlesData.forEach(article => {
      let lastHeading = article.label;
      let lastSlug = toSlug(article.label);
      const lines = article.content.split('\n');
      lines.forEach(line => {
        const headingMatch = line.match(/^#+\s+(.*)/);
        if (headingMatch) {
          lastHeading = headingMatch[1];
          lastSlug = toSlug(lastHeading);
        }
        if (line.toLowerCase().includes(lowerCaseValue)) {
          const result = {
            ...article,
            heading: headingMatch ? headingMatch[1] : lastHeading,
            slug: headingMatch ? toSlug(headingMatch[1]) : lastSlug,
            context: line,
          };
          const resultId = `${result.key}-${result.slug}-${result.context}`;
          if (!results.some(r => `${r.key}-${r.slug}-${r.context}` === resultId)) {
            results.push(result);
          }
        }
      });
    });
    setSearchResults(results);
    return results;
  };

  const onSearch = (value) => {
    if (value) {
      setDrawerSearchValue(value);
      performSearch(value);
      setDrawerVisible(true);
    } else {
      setDrawerVisible(false);
    }
  };

  const handleResultClick = (result) => {
    setHighlightTerm(drawerSearchValue);
    setSearchValue(drawerSearchValue);
    setSelectedKey(result.key);
    if (result.context) {
      setScrollToContext(result.context);
    }
    // setDrawerVisible(false); // Keep drawer open for multiple selections
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <Affix offsetTop={0}>
          <div>
            <div style={{ padding: '16px' }}>
              <Search
                placeholder="搜索文档..."
                onSearch={onSearch}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                enterButton
              />
            </div>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={menuItems}
              style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', borderRight: 0 }}
            />
          </div>
        </Affix>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px 48px', margin: 0 }}>
          <div ref={contentRef} key={selectedKey} className="markdown-body">
            {selectedArticle ? (
              <ReactMarkdown
                children={articleContent}
                remarkPlugins={[gfm]}
                components={{
                  h1: ({ ...props }) => <h1 id={toSlug(props.children)} {...props} />,
                  h2: ({ ...props }) => <h2 id={toSlug(props.children)} {...props} />,
                  h3: ({ ...props }) => <h3 id={toSlug(props.children)} {...props} />,
                  h4: ({ ...props }) => <h4 id={toSlug(props.children)} {...props} />,
                  h5: ({ ...props }) => <h5 id={toSlug(props.children)} {...props} />,
                  h6: ({ ...props }) => <h6 id={toSlug(props.children)} {...props} />,
                }}
              />
            ) : (
              <p>请选择一篇文章查看内容。</p>
            )}
          </div>
        </Content>
      </Layout>
      <Drawer
        title="搜索结果"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
        mask={false}
      >
        <Search
          placeholder="筛选结果..."
          onSearch={performSearch}
          value={drawerSearchValue}
          onChange={(e) => setDrawerSearchValue(e.target.value)}
          enterButton
        />
        <List
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(item, index) => (
            <List.Item key={`${item.key}-${item.slug}-${index}`} onClick={() => handleResultClick(item)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                title={
                  <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[drawerSearchValue]}
                    autoEscape
                    textToHighlight={item.heading}
                  />
                }
                description={
                  <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[drawerSearchValue]}
                    autoEscape
                    textToHighlight={item.context}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </Layout>
  );
};

export default HelpCenter;
