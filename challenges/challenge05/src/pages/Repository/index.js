import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Select,
  PagingButton,
  IssuesControl,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: 'open',
    page: 1,
    nextPage: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const { page, issueState } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issueState,
          per_page: 31,
          page,
        },
      }),
    ]);

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data.slice(0, 30),
      nextPage: issues.data.length === 31,
    });
  }

  updateIssues = async () => {
    const {
      page,
      issueState,
      repository: { full_name: fullName },
    } = this.state;

    this.setState({
      loading: true,
    });

    const response = await api.get(`/repos/${fullName}/issues`, {
      params: {
        state: issueState,
        per_page: 31,
        page,
      },
    });

    this.setState({
      loading: false,
      issues: response.data.slice(0, 30),
      nextPage: response.data.length === 31,
    });
  };

  handleChange = async (e) => {
    const selected = e.target.value;
    const { issueState } = this.state;

    if (issueState !== selected) {
      this.setState({
        issueState: selected,
        page: 1,
      });

      this.updateIssues();
    }
  };

  previous = () => {
    const { page } = this.state;

    if (page > 1) {
      this.setState({ page: page - 1 });
      this.updateIssues();
    }
  };

  next = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    this.updateIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      issueState,
      page,
      nextPage,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssuesControl>
          <Select onChange={this.handleChange} value={issueState}>
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </Select>
          <PagingButton onClick={this.previous} disabled={page === 1}>
            <FaArrowLeft color="#FFF" size={14} />
          </PagingButton>
          <PagingButton onClick={this.next} disabled={!nextPage}>
            <FaArrowRight color="#FFF" size={14} />
          </PagingButton>
        </IssuesControl>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
