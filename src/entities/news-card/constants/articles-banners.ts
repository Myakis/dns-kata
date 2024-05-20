export const banners = [
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/35e80463c86037e4a7c646175a02f613/d7a8d19fa92e571df3bb60088d81b472b24d20b829d9f358f087ef522656039b.jpg.webp',
    big: 'https://o.dns-shop.ru/original/st1/22858b72df69e7a1df746997715ab71d/107e0de4d99004bc0cb29b7e0e67322da3bc92d71e5d112e600d89b4bf2f8a96.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/7607f0ad984a325d16f89011dbc75237/7450ef91cde28cf9a0287750287098d9b78f4cb1294dfe7909cea041146648e3.jpg',
    big: 'https://o.dns-shop.ru/original/st4/f175d8479db8764331da67d06e402908/dc7b31193ff0f8224d41dc31ed58db7f25e314a6a96fdb814fd6250324838623.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st4/crop/356/240/7173d6ae30f3123bfa727be7b20e1dd5/5a07e2db13b5630978125fd3ad1cd2cb80dc35c590ce8fdb97321599fdd44a66.jpg',
    big: 'https://o.dns-shop.ru/original/st1/5207ddb19f00df5b13e7bf6dd02e43b0/6ddb2ecd55e273f92c1a929c924d1ddd851fbae4ef71d14ef1fe56df879ef741.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/f08e162e62156d820f159c84a2d027fc/458917dc397081b6e4b28070abcc64d9c88750e228e217f35f4d96267421e682.jpg',
    big: 'https://o.dns-shop.ru/original/st4/1a3c816b78ef4030b27417e12ddca393/ab68b2a8d76c4d11d983fe65f7077d276446205e970540baa438acb0d1a1cfd7.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st4/crop/356/240/1b5a4ef78775318555033e4710710ff4/f0ffaae5090e8376269e35615cfd517e3e7df57f5e753811eafd2aa27daaabea.jpg',
    big: 'https://o.dns-shop.ru/original/st1/d50b2e20fb7f6d70837e303062892f94/d928b9e180c3ca952c3706884406f4ded32a2ce93a743d5dbffafe092b0bca01.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/2c1ef8078a6a5fddc8a2bacedb70c854/fe715007b396fc0dc14704830fff55e5e5a9d4dbd1f9e3d4aaef7a869a20bd6c.jpg',
    big: 'https://o.dns-shop.ru/original/st1/8d8014dbe490f01c07fc73025f58118b/baf78776b1b02a539e83ba7f46493480d91e6111f818502a247129c0f8ab57a3.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/2a6fdb2b68178736d29a24319934ce45/cb16acbe34af2fe889243fb5e5276264c629d6bec797712f3ad5c192e668b668.jpg',
    big: 'https://o.dns-shop.ru/original/st1/0833abd91c0e89c93ce5ac82c63fc9af/5df174498aad9cb1feb1449464e692532369159952917100998014af63d6b86f.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/741de8939a6c4bc4f31fc0f05dcfceaf/bd573da67227d293ce049a1b549b0f6620905f6ebe157ec67b25daca94dd01b2.jpg',
    big: 'https://o.dns-shop.ru/original/st4/28e0523257457ad8e89517892d767baf/dcd36c1a6e15b8042b6da52cf33c3c310b9c61e6185dd68627b63f7f4ada9814.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/3ccebf320b462ff5086e5a9c73cb3389/68f80cb919b3da82f30da890a205fdd3082f79887a808c78dc8491655e2a7260.jpg',
    big: 'https://o.dns-shop.ru/original/st1/a0be1f4e1cfa699c7b7597a957f1c2a9/9c707100806986c30e1b008f9803a01ecb8d388aef5d91e2dd6fde0e67a0e042.jpg',
  },
  {
    small:
      'https://c.dns-shop.ru/thumb/st1/crop/356/240/85d0d4035b0dad34a89178df79d97b22/2a16258b19960a0caf537b04a3d0fa1d94fad4f472be5f0f554ac141d0754731.jpg',
    big: 'https://o.dns-shop.ru/original/st1/8e739c9db55a42e125c001157a3eb22e/bfc2166858c84bdd9377c198f5f4c94dde052739b8f08574033d1fbc94aed46f.jpg',
  },
];

export default function randomBanner(small: boolean = false): string {
  if (small) {
    return banners[Math.floor(Math.random() * 10)].small;
  }
  return banners[Math.floor(Math.random() * 10)].big;
}
