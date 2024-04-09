Component({
  data: {
    product: {
      value: '1',
      options: [
        {
          value: '1',
          label: '用户1',
          image: 'https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/1.jpg?sign=99bbfbd642f056cdf7a32e511ce66f20&t=1712504034'
        },
        {
          value: '2',
          label: '用户2',
          image: 'https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/2.jpg?sign=4eaac9918b05401ef8ac6fe8225e6593&t=1712504042'
        },
        {
          value: '3',
          label: '用户3',
          image: 'https://6c6f-lot-test-0g7oukwsf488a4a2-1323948587.tcb.qcloud.la/3.jpg?sign=238c8d0443edc3cd760c1347ddc36517&t=1712503987'
        },
      ],
    },
    sorter: {
      value: 'default',
      options: [
        {
          value: 'default',
          label: '默认排序',
        },
        {
          value: 'price',
          label: '价格从高到低',
        },
      ],
    },
  },
  methods: {
    onChange(e) {
      this.setData({
        'product.value': e.detail.value,
      });
    },
  },
});
