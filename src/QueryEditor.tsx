import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryText: event.target.value });
  };

  onConstantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, constant: parseFloat(event.target.value) });
    // executes the query
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { queryText, constant } = query;

    return (
      <div>
        <InlineFieldRow>
          <InlineField label="Constant" labelWidth="auto">
            <Input
              css=""
              onChange={this.onConstantChange}
              step="0.1"
              type="number"
              value={constant}
              width={8}
            />
          </InlineField>
          <InlineField label="Query Text" labelWidth="auto">
            <Input
              css=""
              onChange={this.onQueryTextChange}
              value={queryText || ''}
            />
          </InlineField>
        </InlineFieldRow>
      </div>
    );
  }
}
