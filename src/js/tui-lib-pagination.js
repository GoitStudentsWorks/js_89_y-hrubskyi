import Pagination from 'tui-pagination';
import spriteUrl from '/img/sprite.svg';

export function paginateLibFn(data, itemsPerPage, box, renderFn) {
  const paginationContainer = document.querySelector(
    '#tui-pagination-container'
  );
  if (data.length <= itemsPerPage) {
    paginationContainer.classList.add('is-hidden');
    box.innerHTML = renderFn(data);
    return;
  }

  const visiblePages = window.innerWidth >= 768 ? 7 : 5;

  paginationContainer.classList.remove('is-hidden');
  const options = {
    totalItems: data.length,
    itemsPerPage,
    visiblePages,
    usageStatistics: false,
    template: {
      page: '<button type="button" class="tui-page-btn">{{page}}</button>',
      currentPage:
        '<button class="tui-page-btn tui-is-selected">{{page}}</button>',
      moveButton:
        '<button type="button" class="tui-page-btn tui-{{type}}">' +
        '<svg width="18px" height="18px">' +
        `<use href="${spriteUrl}#icon-arrow"></use>` +
        '</svg >' +
        '</button>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<svg width="18px" height="18px">' +
        `<use href="${spriteUrl}#icon-arrow"></use>` +
        '</svg >' +
        '</span>',
      moreButton:
        '<button type="button" class="tui-page-btn tui-{{type}}-is-ellip">...</button>',
    },
  };

  const instance = new Pagination(paginationContainer, options);
  onPaginationContainerClick({ page: 1 }, itemsPerPage, box, renderFn);

  instance.on('beforeMove', function (eventData) {
    onPaginationContainerClick(eventData, itemsPerPage, box, renderFn);
  });

  function onPaginationContainerClick(eventData, itemsPerPage, box, renderFn) {
    const curPage = eventData.page;
    console.log('curPage: ', curPage);
    console.log('itemsPerPage: ', itemsPerPage);

    instance.setTotalItems(data.length);

    const startIndex = (curPage - 1) * itemsPerPage;
    box.innerHTML = renderFn(data.slice(startIndex, startIndex + itemsPerPage));

    console.log(data);
  }
}

export function paginateWithDeletingLibFn(data, itemsPerPage, box, renderFn) {
  const paginationContainer = document.querySelector(
    '#tui-pagination-container'
  );
  if (data.length <= itemsPerPage) {
    paginationContainer.classList.add('is-hidden');
    box.innerHTML = renderFn(data);
    return;
  }

  paginationContainer.classList.remove('is-hidden');
  const options = {
    totalItems: data.length,
    itemsPerPage,
    visiblePages: 5,
    usageStatistics: false,
  };

  const instance = new Pagination(paginationContainer, options);
  onPaginationContainerClick({ page: 1 }, itemsPerPage, box, renderFn);

  instance.on('beforeMove', function (eventData) {
    onPaginationContainerClick(eventData, itemsPerPage, box, renderFn);
  });

  function onPaginationContainerClick(eventData, itemsPerPage, box, renderFn) {
    const curPage = eventData.page;
    console.log('curPage: ', curPage);
    console.log('itemsPerPage: ', itemsPerPage);

    instance.setTotalItems(data.length);
    const startIndex = (curPage - 1) * itemsPerPage;
    box.innerHTML = renderFn(data.slice(startIndex, startIndex + itemsPerPage));

    console.log(data);
  }
}
