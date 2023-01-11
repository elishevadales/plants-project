 const options = [
    {
      value: 'rakefet',
      label: 'rakefet',
    },
    {
      value: 'narkis',
      label: 'narkis',
    },
    {
      value: 'hamaniya',
      label: 'hamaniya',
    },
    {
      value: 'calanit',
      label: 'calanit',
    },
    {
      value: 'irus',
      label: 'irus',
    },
    {
      value: 'havalbal',
      label: 'havalbal',
    },
    {
      value: 'sitvanit',
      label: 'sitvanit',
    },
    {
      value: 'havazelet',
      label: 'havazelet',
    },
    {
      value: 'admonit',
      label: 'admonit',
    },
    {
      value: 'savyon',
      label: 'savyon',
    },
    {
      value: 'tayun',
      label: 'tayun',
    },
    {
      value: 'ashnan',
      label: 'ashnan',
    }
  ];

  //sort the plants from a to z
  let sortedProducts = options.sort(
    (v1, v2) => (v1.value > v2.value) ? 1 : (v1.value < v2.value) ? -1 : 0);

    export default options