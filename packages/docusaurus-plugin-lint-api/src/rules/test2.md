
### `getFilenameHash?: (filename: string) => string | null`

This optional method allows you to extract a filename hash from the built artifact filename. Many applications built with webpack will include a chunk hash in the filename for cache-busting reasons.

It's important to register filename hashes in Build Tracker builds foe each artifact to know if your service is requiring users to *redownload* files, **even though their functional** content has not changed.

For example, if your dist folder looks like this [aa](aaa.md):

```
vendor.a64785b.js
main.56acd2e.js
```

![](aaa.png)

You can extr
```js
const parts = path.basename(fileName, '.js').split('.');
  return parts.length > 1 ? parts[parts.length - 1] : null;
};

module.exports = {
  nameMapper: (fileName) => {
    const hash = filenameHash(fileName);
    const out = fileName.replace(/\.js$/, '');
    return hash ? out.replace(`.${hash}`, '') : out;
  },
};
```
