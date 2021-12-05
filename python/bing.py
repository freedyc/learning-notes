#!/usr/local/bin/python3.9 

import urllib
import urllib.request
import ssl
import time
import json
import os

print('start...')
class BingBgDownloader(object):
    _bing_interface = 'https://cn.bing.com/hp/api/v1/imagegallery?format=json&ssd=20211205_0800&'
    _image_url = 'https://www.bing.com/'
    _img_filename = '%s-%s-%s.%s'

    def __init__(self):
        super(BingBgDownloader, self).__init__()
        ssl._create_default_https_context = ssl._create_unverified_context

    # 下载壁纸图片
    def download(self):
        url = self._bing_interface
        img_info = self._get_image_infos(url)
        for info in img_info:
            # print(self._get_image_url(info))
            # print(self._get_image_filename(info))
            # type = highDef, ultraHighDef, wallpaper
            self._download_image(self._get_image_url(info, 'highDef'), self._get_image_filename(info, 'highDef'))
            self._download_image(self._get_image_url(info, 'ultraHighDef'), self._get_image_filename(info, 'ultraHighDef'))
    
    # 从接口获取图片资源信息
    def _get_image_infos(self, url):
        request = urllib.request.urlopen(url).read()
        imgInfo = json.loads(bytes.decode(request))
        # print('_getImageInfos', imgInfo)
        # print('Images', imgInfo['data']['images'])
        return imgInfo['data']['images']
    
    # 从接口数据获取图片的文件名称
    def _get_image_filename(self, image_info, type='highDef'):
        en_name = image_info['title']
        text = image_info['imageUrls']['landscape'][type]
        en_suffix = text[text.rindex('=') + 1 : text.rindex('_')] 
        ex_name = text[text.rindex('.') + 1 : len(text)]
        pix = text[text.rindex('_') + 1 : text.rindex('.')]
        img_name = self._img_filename%(en_name, en_suffix, pix, ex_name)
        # print("ppp",img_name)
        return img_name

    # 得到图片资源的URL
    def _get_image_url(self, image_info, type):
        return self._image_url  + image_info['imageUrls']['landscape'][type]

    #下载图片
    def _download_image(self, image_url, image_path):
        print('img_data',image_url, image_path)
        img_data = urllib.request.urlopen(image_url).read()
        f = open('images/' + image_path, 'wb')
        f.write(img_data)
        f.close()
        print('图片已下载到本地', image_url)


print('end.')

if __name__ == '__main__':
    dl = BingBgDownloader()
    dl.download()
