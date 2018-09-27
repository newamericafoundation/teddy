import React from "react";

const defaultButton = props => (
  <button type="button" {...props} className="pagination__btn">
    {props.children}
  </button>
);

export default class Pagination extends React.Component {
  constructor(props) {
    super();
    console.log(props);
    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);

    this.state = {
      page: props.page
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page;
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  }

  changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault();
    }
    const page = this.state.page;
    this.changePage(page === "" ? this.props.page : page);
  }

  render() {
    const {
      // Computed
      pages,
      // Props
      page,
      sortedData,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      PreviousComponent = defaultButton,
      NextComponent = defaultButton
    } = this.props;

    return (
      <div className="pagination" style={this.props.style}>
        <span className="pagination__number-of-entries">
          Showing {page * pageSize + 1} to{" "}
          {page === pages - 1 ? sortedData.length : page * pageSize + pageSize}{" "}
          of {sortedData.length} entries
        </span>
        <div className="pagination__controls">
          <div className="pagination__previous">
            <PreviousComponent
              onClick={() => {
                if (!canPrevious) return;
                this.changePage(page - 1);
              }}
              disabled={!canPrevious}
            >
              {this.props.previousText}
            </PreviousComponent>
          </div>
          <div className="pagination__center">
            <span className="pagination__page-info">
              {this.props.pageText}{" "}
              {showPageJump ? (
                <div className="pagination__page-jump">
                  <input
                    type={this.state.page === "" ? "text" : "number"}
                    onChange={e => {
                      const val = e.target.value;
                      const page = val - 1;
                      if (val === "") {
                        return this.setState({ page: val });
                      }
                      this.setState({ page: this.getSafePage(page) });
                    }}
                    value={this.state.page === "" ? "" : this.state.page + 1}
                    onBlur={this.applyPage}
                    onKeyPress={e => {
                      if (e.which === 13 || e.keyCode === 13) {
                        this.applyPage();
                      }
                    }}
                  />
                </div>
              ) : (
                <span className="pagination__current-page">{page + 1}</span>
              )}{" "}
              {this.props.ofText}
              <span className="pagination__total-pages">{pages || 1}</span>
            </span>
          </div>
          <div className="pagination__next">
            <NextComponent
              onClick={() => {
                if (!canNext) return;
                this.changePage(page + 1);
              }}
              disabled={!canNext}
            >
              {this.props.nextText}
            </NextComponent>
          </div>
        </div>
      </div>
    );
  }
}
