import { UserTC } from '../models/user';
const LIMIT = 200;

const UserQuery = {
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany').wrapResolve((next) => (rp) => {
    rp.args.limit = Math.min(rp.args.limit, LIMIT);
    return next(rp);
  }),

  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination').addFilterArg({
    name: 'search',
    type: 'String',
    description: 'Search by regExp',
    query: (rawQuery, value) => {
      rawQuery['$or'] = [
        { firstname: new RegExp(value, 'i') },
        { lastname: new RegExp(value, 'i') },
        { department: new RegExp(value, 'i') },
      ];
    },
  }),
};

const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
};

export { UserQuery, UserMutation };
